import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useInventorySelection } from '../inventory-selection';

describe('useInventorySelection', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useInventorySelection());
    act(() => {
      result.current.clearSelection();
    });
  });

  it('should initialize with empty selection', () => {
    const { result } = renderHook(() => useInventorySelection());

    expect(result.current.selectedRows).toEqual({});
    expect(result.current.getSelectedIds()).toEqual([]);
  });

  it('should set selected rows with object', () => {
    const { result } = renderHook(() => useInventorySelection());

    act(() => {
      result.current.setSelectedRows({ '1': true, '2': true, '3': true });
    });

    expect(result.current.selectedRows).toEqual({ '1': true, '2': true, '3': true });
  });

  it('should set selected rows with function updater', () => {
    const { result } = renderHook(() => useInventorySelection());

    act(() => {
      result.current.setSelectedRows({ '1': true });
    });

    act(() => {
      result.current.setSelectedRows(prev => ({ ...prev, '2': true }));
    });

    expect(result.current.selectedRows).toEqual({ '1': true, '2': true });
  });

  it('should clear selection', () => {
    const { result } = renderHook(() => useInventorySelection());

    act(() => {
      result.current.setSelectedRows({ '1': true, '2': true, '3': true });
    });

    expect(Object.keys(result.current.selectedRows).length).toBe(3);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedRows).toEqual({});
    expect(result.current.getSelectedIds()).toEqual([]);
  });

  it('should return selected IDs as array of numbers', () => {
    const { result } = renderHook(() => useInventorySelection());

    act(() => {
      result.current.setSelectedRows({ '10': true, '20': true, '30': true });
    });

    const selectedIds = result.current.getSelectedIds();

    expect(selectedIds).toHaveLength(3);
    expect(selectedIds).toContain(10);
    expect(selectedIds).toContain(20);
    expect(selectedIds).toContain(30);
    // Verify they are numbers, not strings
    expect(selectedIds.every(id => typeof id === 'number')).toBe(true);
  });

  it('should persist state across multiple hook renders', () => {
    const { result: result1 } = renderHook(() => useInventorySelection());

    act(() => {
      result1.current.setSelectedRows({ '5': true, '10': true });
    });

    // Render hook again to simulate different component
    const { result: result2 } = renderHook(() => useInventorySelection());

    // Should have same state (Zustand is a singleton)
    expect(result2.current.selectedRows).toEqual({ '5': true, '10': true });
    expect(result2.current.getSelectedIds()).toEqual([5, 10]);
  });

  it('should handle deselection by removing keys', () => {
    const { result } = renderHook(() => useInventorySelection());

    act(() => {
      result.current.setSelectedRows({ '1': true, '2': true, '3': true });
    });

    act(() => {
      result.current.setSelectedRows(prev => {
        const { '2': _, ...rest } = prev;

        return rest;
      });
    });

    expect(result.current.selectedRows).toEqual({ '1': true, '3': true });
    expect(result.current.getSelectedIds()).toEqual([1, 3]);
  });
});
