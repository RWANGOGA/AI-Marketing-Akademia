import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ContentPage from '@/app/admin/content/page';

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

describe('AdminContent', () => {
  beforeEach(() => {
    (apiFetchWithAuth as jest.Mock).mockClear();
  });

  it('renders content table with data', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([
      {
        id: 'B1',
        type: 'blog_post',
        title: 'How AI Recruiter cut screening time',
        status: 'published',
        date: 'Aug 12, 2026',
        excerpt: 'A short look...',
        image_url: '',
        tag: 'Product update',
      },
    ]);

    render(<ContentPage />);
    await waitFor(() => {
      expect(screen.getByText('How AI Recruiter cut screening time')).toBeInTheDocument();
    });
    expect(screen.getByText('Product update')).toBeInTheDocument();
  });

  it('shows empty state when no content', async () => {
    (apiFetchWithAuth as jest.Mock).mockResolvedValue([]);

    render(<ContentPage />);
    await waitFor(() => {
      expect(screen.getByText(/No content found/i)).toBeInTheDocument();
    });
  });
});
