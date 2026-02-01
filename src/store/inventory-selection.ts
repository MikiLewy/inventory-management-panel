import { RowSelectionState } from '@tanstack/react-table';
import { create } from 'zustand';

interface InventorySelectionState {
  selectedRows: RowSelectionState;
}

interface InventorySelectionActions {
  setSelectedRows: (rows: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  clearSelection: () => void;
  getSelectedIds: () => number[];
}

type InventorySelectionStore = InventorySelectionState & InventorySelectionActions;

export const useInventorySelection = create<InventorySelectionStore>()((set, get) => ({
  selectedRows: {},

  setSelectedRows: updater => {
    if (typeof updater === 'function') {
      set(state => ({
        selectedRows: updater(state.selectedRows),
      }));
    } else {
      set({ selectedRows: updater });
    }
  },

  clearSelection: () => {
    set({ selectedRows: {} });
  },

  getSelectedIds: () => {
    const { selectedRows } = get();

    return Object.keys(selectedRows).map(key => Number(key));
  },
}));
