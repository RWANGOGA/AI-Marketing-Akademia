import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CampaignsPage from '@/app/admin/campaigns/page';

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

describe('AdminCampaigns', () => {
  beforeEach(() => {
    (apiFetchWithAuth as jest.Mock).mockClear();
  });

  it('renders campaigns table with data', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([
      {
        id: 'C1',
        name: 'Q3 Lead Gen',
        product_id: 'prod-1',
        status: 'running',
        found: 12,
        contacted: 8,
        responded: 5,
        interested: 3,
        meetings: 1,
        customers: 0,
      },
    ]);

    render(<CampaignsPage />);
    await waitFor(() => {
      expect(screen.getByText('Q3 Lead Gen')).toBeInTheDocument();
    });
    expect(screen.getByText('running')).toBeInTheDocument();
  });

  it('shows empty state when no campaigns', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([]);

    render(<CampaignsPage />);
    await waitFor(() => {
      expect(screen.getByText(/No campaigns found/i)).toBeInTheDocument();
    });
  });
});
