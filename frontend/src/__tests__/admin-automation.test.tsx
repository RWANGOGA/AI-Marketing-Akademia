import React from 'react';
import { render, screen } from '@testing-library/react';
import AutomationPage from '@/app/admin/automation/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminAutomation', () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockClear();
  });

  it('renders automations table with data', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'A1',
        name: 'Lead Discovery',
        status: 'running',
        last_run: '12 min ago',
        result: 'Found 6 new companies',
      },
    ]);

    render(await AutomationPage());
    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('Lead Discovery')).toBeInTheDocument();
    expect(screen.getByText('Found 6 new companies')).toBeInTheDocument();
  });

  it('shows empty state when no automations', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([]);

    render(await AutomationPage());
    expect(screen.getByText(/No automations found/i)).toBeInTheDocument();
  });
});
