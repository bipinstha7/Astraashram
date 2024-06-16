import { test, expect } from '@playwright/test';
import { ASTRAASAN_DATA } from '@/lib/constants';

test.describe.configure({ mode: 'parallel' });

const URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/public/sign-up';
const SIGN_IN_URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/public/sign-in';
const DASHBOARD_URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/dashboard';
const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/auth/sign-up/v1';

test.describe('Sign up page', () => {
  test('Should route to sign in page on clicking the sign in link ', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign in' }).click();

    await page.waitForURL(SIGN_IN_URL);
    expect(page.url()).toBe(SIGN_IN_URL);
  });

  test('Should return error if name, email and password fields are empty', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByTestId('name')).toContainText('Name must be at least 5 characters');
    await expect(page.getByTestId('email')).toContainText('Invalid email');
    await expect(page.getByTestId('password')).toContainText(
      'Must be at least 8 Characters with uppercase, lowercase, number and special characters'
    );
  });

  test('Should return error if name and password fields are invalid', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await page.getByLabel('name').fill('bip');
    await page.getByLabel('Password').fill('Shrestha');

    await expect(page.getByTestId('name')).toContainText('Name must be at least 5 characters');
    await expect(page.getByTestId('password')).toContainText(
      'Must be at least 8 Characters with uppercase, lowercase, number and special characters'
    );
  });

  test('Should sign up and redirect to dashboard if credentials are true', async ({ page }) => {
    // Mock the api call before navigating
    const response = { name: 'Bipin Shrestha', email: 'bipin@shrestha.com' };
    await page.route(API_URL, async route => {
      page.context().addCookies([
        {
          name: 'access_token',
          value: 'randomtokenvalue',
          path: '/admin',
          httpOnly: true,
          domain: 'localhost',
        },
      ]);
      await route.fulfill({ json: response });
    });

    await page.goto(URL);
    await page.getByLabel('name').fill(response.name);
    await page.getByLabel('E-mail').fill(response.email);
    await page.getByLabel('Password').fill('Shrestha99!');

    await page.getByRole('button', { name: 'Sign up' }).click();

    const localStorageData = await page.evaluate(
      ASTRAASAN_DATA => localStorage.getItem(ASTRAASAN_DATA),
      ASTRAASAN_DATA
    );

    expect(localStorageData).toBeTruthy();

    const storageData: { name: string; email: string } = JSON.parse(localStorageData as string);
    await expect(storageData.name).toBe(response.name);
    await expect(storageData.email).toBe(response.email);

    await page.waitForURL(DASHBOARD_URL);
    expect(page.url()).toBe(DASHBOARD_URL);
  });
});
