import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LeadsPage from '@/app/admin/leads/page';

jest.mock('@/lib/api', () => ({
  apiFetchWithAuth: jest.fn(),
  apiFetch: jest.fn(),
}));

jest.mock('@/app/admin/_components/auth-context', () => ({
  useAuth: () => ({
    token: 'mock-token',
    user: { id: '1', email: 'admin@akademia.local', name: 'Admin' },
    loading: false,
  }),
}));

const { apiFetchWithAuth } = require('@/lib/api') as { apiFetchWithAuth: jest.Mock };

describe('AdminLeads', () => {
  beforeEach(() => {
    (apiFetchWithAuth as jest.Mock).mockClear();
  });

  it('renders leads table with data', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([
      {
        id: '1',
        company: 'Acme Corp',
        contact: 'John Doe',
        email: 'john@acme.com',
        status: 'new',
        product_id: 'prod-1',
      },
    ]);

    render(<LeadsPage />);
    await waitFor(() => {
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@acme.com')).toBeInTheDocument();
  });

  it('shows empty state when no leads', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([]);

    render(<LeadsPage />);
    await waitFor(() => {
      expect(screen.getByText(/No leads found/i)).toBeInTheDocument();
    });
  });
});
