import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/(marketing)/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('HomePage', () => {
  it('renders hero heading', async () => {
    apiFetch.mockResolvedValue([]);
    render(await HomePage());
    expect(screen.getByText(/Practical AI products/i)).toBeInTheDocument();
  });

  it('renders product dock when products are published', async () => {
    apiFetch.mockResolvedValue([
      {
        id: '1',
        slug: 'port',
        name: 'AI Port',
        published: true,
        problem: 'Scaling outreach',
        target: 'Growth teams',
        description: 'AI Port helps',
        features: ['A'],
        benefits: ['B'],
      },
    ]);
    render(await HomePage());
    expect(screen.getByText('AI Port')).toBeInTheDocument();
    expect(screen.getByText('Scaling outreach')).toBeInTheDocument();
  });

  it('shows empty state when no published products', async () => {
    apiFetch.mockResolvedValue([]);
    render(await HomePage());
    expect(screen.getByText(/No products published yet/i)).toBeInTheDocument();
  });
});
