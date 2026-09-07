import { apiFetch } from '@/lib/api';

global.fetch = jest.fn();

describe('apiFetch', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('returns parsed JSON on success', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: '1', name: 'Test' }),
    });

    const result = await apiFetch<{ id: string; name: string }>('/test');
    expect(result).toEqual({ id: '1', name: 'Test' });
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/test',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('throws on non-ok response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Server error',
    });

    await expect(apiFetch('/test')).rejects.toThrow('API error 500: Server error');
  });
});
