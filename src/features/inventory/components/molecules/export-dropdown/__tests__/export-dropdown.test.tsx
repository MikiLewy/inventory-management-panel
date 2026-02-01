import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { exportProducts } from '../../../../server/actions/export-products';
import { ExportDropdown } from '../export-dropdown';

// Mock dependencies
vi.mock('../../../../server/actions/export-products');
vi.mock('../../../../utils/export-products', () => ({
  triggerDownload: vi.fn(),
}));

vi.mocked(exportProducts);

describe('ExportDropdown', () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const renderComponent = (props = {}) => {
    const defaultProps = {
      selectedIds: [],
      filters: undefined,
      query: undefined,
      disabled: false,
    };

    return render(<ExportDropdown {...defaultProps} {...props} />, { wrapper });
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render export button', () => {
      renderComponent();

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('exportProducts.export')).toBeInTheDocument();
    });

    it('should open dropdown on click', async () => {
      const user = userEvent.setup();
      renderComponent();

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByText('exportProducts.exportAll')).toBeInTheDocument();
    });

    it('should show Export All submenu trigger', async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('exportProducts.exportAll')).toBeInTheDocument();
    });

    it('should show Export Selected submenu with count', async () => {
      const user = userEvent.setup();
      renderComponent({ selectedIds: [1, 2, 3] });

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('exportProducts.exportSelected (3)')).toBeInTheDocument();
    });

    it('should show count of 0 when no selection', async () => {
      const user = userEvent.setup();
      renderComponent({ selectedIds: [] });

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('exportProducts.exportSelected (0)')).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
      renderComponent({ disabled: true });

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should render download icon', () => {
      renderComponent();

      // The button should contain an SVG (Download icon)
      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should update selected count when selectedIds changes', async () => {
      const user = userEvent.setup();
      const { rerender } = renderComponent({ selectedIds: [1, 2] });

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('exportProducts.exportSelected (2)')).toBeInTheDocument();

      // Close dropdown
      await user.keyboard('{Escape}');

      // Rerender with different selectedIds
      rerender(
        <QueryClientProvider client={queryClient}>
          <ExportDropdown selectedIds={[1, 2, 3, 4, 5]} />
        </QueryClientProvider>,
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('exportProducts.exportSelected (5)')).toBeInTheDocument();
    });
  });

  describe('dropdown menu structure', () => {
    it('should have Export All and Export Selected menu items', async () => {
      const user = userEvent.setup();
      renderComponent({ selectedIds: [1, 2] });

      await user.click(screen.getByRole('button'));

      // Both submenu triggers should be present
      expect(screen.getByText('exportProducts.exportAll')).toBeInTheDocument();
      expect(screen.getByText('exportProducts.exportSelected (2)')).toBeInTheDocument();
    });

    it('should have disabled Export Selected when no items selected', async () => {
      const user = userEvent.setup();
      renderComponent({ selectedIds: [] });

      await user.click(screen.getByRole('button'));

      const exportSelectedTrigger = screen.getByText('exportProducts.exportSelected (0)');
      // The parent element should have disabled state
      expect(exportSelectedTrigger.closest('[data-disabled]')).toBeInTheDocument();
    });

    it('should not have disabled Export Selected when items are selected', async () => {
      const user = userEvent.setup();
      renderComponent({ selectedIds: [1, 2, 3] });

      await user.click(screen.getByRole('button'));

      const exportSelectedTrigger = screen.getByText('exportProducts.exportSelected (3)');
      expect(exportSelectedTrigger.closest('[data-disabled]')).not.toBeInTheDocument();
    });
  });
});
