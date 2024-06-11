import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import SignInPage from '../page';

describe('Sign in page', () => {
  it('should show an error if either email or password is invalid', async () => {
    render(<SignInPage />);

    /**
     * to get rid of the error -
     *  TypeError: useFormState is not a function or its return value is not iterable
     */

    vi.mock('react-dom', async () => {
      return {
        useFormState: () => [{ errors: [{ message: 'Invalid email or password' }] }, vi.fn()],
        useFormStatus: () => ({ pending: false }),
      };
    });

    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /sign in/i });

    user.type(screen.getByLabelText('E-mail'), 'emailData');
    user.type(screen.getByLabelText('Password'), 'pass');
    user.click(submitButton);

    expect((await screen.findByTestId('signin-error')).textContent).toBe(
      'Invalid email or password'
    );
  });
});
