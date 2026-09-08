import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentPage from '@/app/admin/content/page';

jest.mock('@/lib/api', () => ({
  apiFetch: jest.fn(),
}));

const { apiFetch } = require('@/lib/api') as { apiFetch: jest.Mock };

describe('AdminContent', () => {
  beforeEach(() => {
    (apiFetch as jest.Mock).mockClear();
  });

  it('renders content table with data', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([
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

    render(await ContentPage());
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('How AI Recruiter cut screening time')).toBeInTheDocument();
    expect(screen.getByText('Product update')).toBeInTheDocument();
  });

  it('shows empty state when no content', async () => {
    (apiFetch as jest.Mock).mockResolvedValue([]);

    render(await ContentPage());
    expect(screen.getByText(/No content found/i)).toBeInTheDocument();
  });
});
