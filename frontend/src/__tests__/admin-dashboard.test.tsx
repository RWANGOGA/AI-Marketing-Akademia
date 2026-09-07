import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/admin/dashboard/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminDashboard', () => {
  it('renders dashboard heading', async () => {
    apiFetch.mockResolvedValue({
      new: 10,
      contacted: 5,
      responded: 3,
      needs_followup: 2,
      meetings: 1,
      customers: 0,
      lost: 1,
    });
    render(await DashboardPage());
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('New Leads')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pipeline Funnel' })).toBeInTheDocument();
  });

  it('renders pipeline funnel', async () => {
    apiFetch.mockResolvedValue({
      new: 10,
      contacted: 5,
      responded: 3,
      needs_followup: 2,
      meetings: 1,
      customers: 0,
      lost: 1,
    });
    render(await DashboardPage());
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getAllByText('Contacted').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Meetings').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Lost leads: 1/)).toBeInTheDocument();
  });
});
