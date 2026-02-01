import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';

import { exportProducts } from '../../../server/actions/export-products';
import { triggerDownload } from '../../../utils/export-products';
import { useExportProducts } from '../use-export-products';

vi.mock('../../../server/actions/export-products');
vi.mock('../../../utils/export-products', () => ({
  triggerDownload: vi.fn(),
}));

const mockExportProducts = vi.mocked(exportProducts);
const mockTriggerDownload = vi.mocked(triggerDownload);

describe('useExportProducts', () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  it('should call exportProducts server action', async () => {
    const mockResult = {
      data: 'base64data',
      filename: 'test.csv',
      mimeType: 'text/csv',
      count: 5,
    };
    mockExportProducts.mockResolvedValueOnce(mockResult);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockExportProducts).toHaveBeenCalledWith({
      format: 'csv',
      scope: 'all',
    });
  });

  it('should trigger download on success', async () => {
    const mockResult = {
      data: 'base64data',
      filename: 'products-export-2024-01-15.csv',
      mimeType: 'text/csv;charset=utf-8',
      count: 10,
    };
    mockExportProducts.mockResolvedValueOnce(mockResult);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockTriggerDownload).toHaveBeenCalledWith(
      'base64data',
      'products-export-2024-01-15.csv',
      'text/csv;charset=utf-8',
    );
  });

  it('should show success toast with count', async () => {
    const mockResult = {
      data: 'base64data',
      filename: 'test.csv',
      mimeType: 'text/csv',
      count: 25,
    };
    mockExportProducts.mockResolvedValueOnce(mockResult);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(toast.success).toHaveBeenCalled();
  });

  it('should show error toast on failure', async () => {
    mockExportProducts.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should show specific toast for no products error', async () => {
    mockExportProducts.mockRejectedValueOnce(new Error('No products to export'));

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should show specific toast for limit exceeded error', async () => {
    mockExportProducts.mockRejectedValueOnce(
      new Error('Export limit exceeded. Maximum 10,000 products can be exported at once.'),
    );

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('should return isLoading state during mutation', async () => {
    // Create a promise we can control
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    mockExportProducts.mockReturnValueOnce(pendingPromise as never);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    expect(result.current.isPending).toBe(false);

    act(() => {
      result.current.mutate({
        format: 'xlsx',
        scope: 'selected',
        selectedIds: [1, 2, 3],
      });
    });

    // Wait for isPending to become true
    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    // Resolve the promise
    act(() => {
      resolvePromise!({
        data: 'base64data',
        filename: 'test.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        count: 3,
      });
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });

  it('should pass selected IDs for selected scope', async () => {
    const mockResult = {
      data: 'base64data',
      filename: 'test.csv',
      mimeType: 'text/csv',
      count: 3,
    };
    mockExportProducts.mockResolvedValueOnce(mockResult);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    act(() => {
      result.current.mutate({
        format: 'csv',
        scope: 'selected',
        selectedIds: [1, 5, 10],
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockExportProducts).toHaveBeenCalledWith({
      format: 'csv',
      scope: 'selected',
      selectedIds: [1, 5, 10],
    });
  });

  it('should pass filters for all scope', async () => {
    const mockResult = {
      data: 'base64data',
      filename: 'test.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      count: 50,
    };
    mockExportProducts.mockResolvedValueOnce(mockResult);

    const { result } = renderHook(() => useExportProducts(), { wrapper });

    const filters = {
      status: ['IN_STOCK'] as ProductStatus[],
      warehouse: ['1', '2'],
    };

    act(() => {
      result.current.mutate({
        format: 'xlsx',
        scope: 'all',
        filters,
        query: 'Nike',
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockExportProducts).toHaveBeenCalledWith({
      format: 'xlsx',
      scope: 'all',
      filters,
      query: 'Nike',
    });
  });
});
