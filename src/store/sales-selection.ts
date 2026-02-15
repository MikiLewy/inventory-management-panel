import { RowSelectionState } from '@tanstack/react-table';
import { create } from 'zustand';

interface SalesSelectionState {
  selectedRows: RowSelectionState;
}

interface SalesSelectionActions {
  setSelectedRows: (rows: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  clearSelection: () => void;
  getSelectedIds: () => number[];
}

type SalesSelectionStore = SalesSelectionState & SalesSelectionActions;

export const useSalesSelection = create<SalesSelectionStore>()((set, get) => ({
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
