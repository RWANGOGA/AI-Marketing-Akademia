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
    expect(screen.getByText(/Four practical AI products/i)).toBeInTheDocument();
  });

  it('renders product dock with four products', async () => {
    apiFetch.mockResolvedValue([]);
    render(await HomePage());
    expect(screen.getByText('AI Pod')).toBeInTheDocument();
    expect(screen.getByText('AI Recruiter')).toBeInTheDocument();
    expect(screen.getByText('AI Dojo')).toBeInTheDocument();
    expect(screen.getByText('AI World')).toBeInTheDocument();
  });

  it('renders product cards when products are published', async () => {
    apiFetch.mockResolvedValue([
      {
        id: '1',
        slug: 'pod',
        name: 'AI Pod',
        published: true,
        problem: 'Scaling outreach',
        target: 'Growth teams',
        description: 'AI Pod helps teams manage tasks and reporting in one place.',
        features: ['A'],
        benefits: ['B'],
      },
    ]);
    render(await HomePage());
    const podElements = screen.getAllByText('AI Pod');
    expect(podElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('AI Pod helps teams manage tasks and reporting in one place.')).toBeInTheDocument();
  });

  it('shows empty state when no published products', async () => {
    apiFetch.mockResolvedValue([]);
    render(await HomePage());
    expect(screen.getByText(/No products published yet/i)).toBeInTheDocument();
  });
});
