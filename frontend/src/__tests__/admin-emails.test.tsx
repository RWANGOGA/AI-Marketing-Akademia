import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailsPage from '@/app/admin/emails/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminEmails', () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockClear();
  });

  it('renders emails table with data', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'E-501',
        lead_name: 'Acme Corp',
        product_name: 'AI Pod',
        status: 'draft',
        subject: 'Hello',
        body: 'Body',
      },
    ]);

    render(await EmailsPage());
    expect(screen.getByText('Emails')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('AI Pod')).toBeInTheDocument();
  });

  it('shows empty state when no emails', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([]);

    render(await EmailsPage());
    expect(screen.getByText(/No emails found/i)).toBeInTheDocument();
  });
});
