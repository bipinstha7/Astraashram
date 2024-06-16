import { test, expect } from '@playwright/test';
import { ASTRAASAN_DATA } from '@/lib/constants';

test.describe.configure({ mode: 'parallel' });

const URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/public/sign-in';
const SIGN_UP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/public/sign-up';
const DASHBOARD_URL = process.env.NEXT_PUBLIC_FRONTEND_URL + '/admin/dashboard';
const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/auth/sign-in/v1';

test.describe('Sign in page', () => {
  test('Should route to sign up page on clicking the sign up link ', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('link', { name: 'Sign up' }).click();

    await page.waitForURL(SIGN_UP_URL);
    expect(page.url()).toBe(SIGN_UP_URL);
  });

  test('Should return error if email and password fields are empty', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByTestId('email')).toContainText('Invalid email');
    await expect(page.getByTestId('password')).toContainText('Password is required');
  });

  test('Should sign in NS redirect to dashboard if credentials are true', async ({ page }) => {
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
    await page.getByLabel('E-mail').fill('bipin@shrestha.com');
    await page.getByLabel('Password').fill('shresha');

    await page.getByRole('button', { name: 'Sign in' }).click();

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
