import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsPage from '@/app/admin/products/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminProducts', () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockClear();
    global.fetch = jest.fn();
  });

  it('renders products table with data', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'prod-1',
        name: 'AI Pod',
        slug: 'pod',
        published: true,
        problem: 'Work scattered',
        target: 'Teams',
        description: 'Task management and reporting system',
        features: [],
        benefits: [],
        capabilities: [],
        category: 'business',
        price: '$299/mo',
        image_url: '',
        marketing_status: 'completed',
        marketing_result: '',
      },
    ]);

    render(await ProductsPage());
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('AI Pod')).toBeInTheDocument();
    expect(screen.getByText('Marketing complete')).toBeInTheDocument();
  });

  it('shows pending status and publish button for unpublished products', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'prod-2',
        name: 'AI World',
        slug: 'world',
        published: true,
        problem: 'Virtual experiences',
        target: 'Travellers',
        description: 'A virtual world built around Japan.',
        features: [],
        benefits: [],
        capabilities: [],
        category: 'general',
        price: '$99/mo',
        image_url: '',
        marketing_status: 'pending',
        marketing_result: '',
      },
    ]);

    render(await ProductsPage());
    const statusBadge = screen.getByText('pending');
    expect(statusBadge).toBeInTheDocument();
    expect(screen.getByText('Publish to Marketing')).toBeInTheDocument();
  });

  it('shows running status for queued products', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'prod-3',
        name: 'AI Dojo',
        slug: 'dojo',
        published: true,
        problem: 'Impersonal AI',
        target: 'Everyone',
        description: 'Interactive AI avatars.',
        features: [],
        benefits: [],
        capabilities: [],
        category: 'general',
        price: '$199/mo',
        image_url: '',
        marketing_status: 'queued',
        marketing_result: '',
      },
    ]);

    render(await ProductsPage());
    expect(screen.getByText('Running...')).toBeInTheDocument();
  });

  it('shows empty state when no products', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([]);

    render(await ProductsPage());
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it('triggers publish when Publish button is clicked', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
      {
        id: 'prod-4',
        name: 'AI Recruiter',
        slug: 'recruiter',
        published: true,
        problem: 'Manual screening',
        target: 'HR teams',
        description: 'AI recruiting platform.',
        features: [],
        benefits: [],
        capabilities: [],
        category: 'business',
        price: '$249/mo',
        image_url: '',
        marketing_status: 'pending',
        marketing_result: '',
      },
    ]);

    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({}) });

    render(await ProductsPage());

    const publishButton = screen.getByText('Publish to Marketing');
    fireEvent.click(publishButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/products/recruiter/publish',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });
});
