import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/admin/dashboard/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminDashboard', () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockClear();
  });

  it('renders dashboard heading', async () => {
    (apiFetch as jest.Mock)
      .mockResolvedValueOnce({
        new: 10,
        contacted: 5,
        responded: 3,
        needs_followup: 2,
        meetings: 1,
        customers: 0,
        lost: 1,
      })
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    render(await DashboardPage());
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('New leads')).toBeInTheDocument();
  });

  it('renders pipeline funnel', async () => {
    (apiFetch as jest.Mock)
      .mockResolvedValueOnce({
        new: 10,
        contacted: 5,
        responded: 3,
        needs_followup: 2,
        meetings: 1,
        customers: 0,
        lost: 1,
      })
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    render(await DashboardPage());
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Meeting')).toBeInTheDocument();
  });

  it('shows needs attention when leads exist', async () => {
    (apiFetch as jest.Mock)
      .mockResolvedValueOnce({
        new: 10,
        contacted: 5,
        responded: 3,
        needs_followup: 2,
        meetings: 1,
        customers: 0,
        lost: 1,
      })
      .mockResolvedValueOnce([
        {
          id: '1',
          company: 'Acme Corp',
          status: 'new',
          last_contact: '',
        },
        {
          id: '2',
          company: 'Beta Ltd',
          status: 'needs-followup',
          last_contact: '2 days ago',
        },
      ])
      .mockResolvedValueOnce([]);

    render(await DashboardPage());
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Beta Ltd')).toBeInTheDocument();
  });
});
