import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/admin/login/page';
import { AuthProvider } from '@/app/admin/_components/auth-context';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

global.fetch = jest.fn();

describe('AdminLogin', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const renderLogin = () => render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );

  it('renders login form', () => {
    renderLogin();
    expect(screen.getByText('Admin login')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('logs in and redirects on success', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'token123' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '1', email: 'admin@example.com', name: 'Admin' }),
      });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/auth/login',
        expect.objectContaining({
          method: 'POST',
        }),
      );
      const call = (fetch as jest.Mock).mock.calls[0];
      expect(call[1].body).toBeInstanceOf(URLSearchParams);
    });
  });

  it('shows error on failed login', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'Incorrect email or password',
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Incorrect email or password/i)).toBeInTheDocument();
    });
  });
});
