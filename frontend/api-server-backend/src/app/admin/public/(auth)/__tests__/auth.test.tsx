import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import * as helper from '@/lib/helper';
import SignInPage from '../sign-in/page';
import SignUpPage from '../sign-up/page';
import { ASTRAASAN_DATA } from '@/lib/constants';

vi.mock('@/lib/utils/api-requests', () => {
  const data = {
    name: 'Bipin Shrestha',
    email: 'bipin@shretha.com',
  };
  return {
    signinUser: vi.fn().mockResolvedValueOnce(data),
    signupUser: vi.fn().mockResolvedValueOnce(data),
  };
});

const routerPush = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: routerPush.push }) }));

const routerPushSpy = vi.spyOn(routerPush, 'push');

describe('Sign in page', () => {
  it('should show an error if both email and password field is empty', async () => {
    render(<SignInPage />);

    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /sign in/i });

    user.click(submitButton);

    expect((await screen.findByTestId('email')).textContent).toBe('Invalid email');

    expect((await screen.findByTestId('password')).textContent).toBe('Password is required');
  });

  it('should sigin and redirect to dashboard', async () => {
    render(<SignInPage />);

    const localStorage = vi.spyOn(helper, 'setLocalStorage');

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('E-mail'), 'bipin@shrestha.com');
    await user.type(screen.getByLabelText('Password'), 'Password8@');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(localStorage).toHaveBeenCalledWith({
      data: JSON.stringify({
        name: 'Bipin Shrestha',
        email: 'bipin@shretha.com',
      }),
      name: ASTRAASAN_DATA,
    });

    expect(routerPushSpy).toHaveBeenCalledWith('/admin/dashboard');
  });
});

describe('Sign up page', () => {
  it('should show an error if name, email and password field are empty', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    user.click(submitButton);

    expect((await screen.findByTestId('name')).textContent).toBe(
      'Name must be at least 5 characters'
    );
    expect((await screen.findByTestId('email')).textContent).toBe('Invalid email');
    expect((await screen.findByTestId('password')).textContent).toBe(
      'Must be at least 8 Characters with uppercase, lowercase, number and special characters'
    );
  });

  it('should show an error if name is less than 5 characters', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Full Name'), 'bipi');

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    user.click(submitButton);

    expect((await screen.findByTestId('name')).textContent).toBe(
      'Name must be at least 5 characters'
    );
  });

  it('should show an error if email is invalid', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('E-mail'), 'a@b.c');

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    user.click(submitButton);

    expect((await screen.findByTestId('email')).textContent).toBe('Invalid email');
  });

  it('should show an error if password is invalid', async () => {
    render(<SignUpPage />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Password'), 'pass');

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    user.click(submitButton);

    expect((await screen.findByTestId('password')).textContent).toBe(
      'Must be at least 8 Characters with uppercase, lowercase, number and special characters'
    );
  });

  it('should sigup and redirect to dashboard', async () => {
    render(<SignUpPage />);

    const localStorage = vi.spyOn(helper, 'setLocalStorage');

    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Full Name'), 'Bipin');
    await user.type(screen.getByLabelText('E-mail'), 'bipin@shrestha.com');
    await user.type(screen.getByLabelText('Password'), 'Password8@');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    expect(localStorage).toHaveBeenCalledWith({
      data: JSON.stringify({
        name: 'Bipin Shrestha',
        email: 'bipin@shretha.com',
      }),
      name: ASTRAASAN_DATA,
    });

    expect(routerPushSpy).toHaveBeenCalledWith('/admin/dashboard');
  });
});
