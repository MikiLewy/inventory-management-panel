import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'inventory' | 'sales';

type ViewsSetting = Record<
  View,
  {
    hiddenColumns: string[];
  }
>;

type ViewActions = {
  setHiddenColumn: (view: View, column: string) => void;
};

interface ViewSettingsState {
  viewsSettings: ViewsSetting;
}

type ViewSettingsStore = ViewSettingsState & ViewActions;

export const defaultViewsSettings: ViewsSetting = {
  inventory: { hiddenColumns: [] },
  sales: { hiddenColumns: [] },
};

export const useViewSettings = create<ViewSettingsStore>()(
  persist(
    (set, get) => ({
      viewsSettings: defaultViewsSettings,
      setHiddenColumn: (view, column) => {
        const { viewsSettings } = get();

        const hiddenColumns = viewsSettings[view].hiddenColumns.includes(column)
          ? viewsSettings[view].hiddenColumns.filter(c => c !== column)
          : [...viewsSettings[view].hiddenColumns, column];

        set(state => ({
          viewsSettings: {
            ...state.viewsSettings,
            [view]: { hiddenColumns },
          },
        }));
      },
    }),
    {
      name: 'views-settings',
    },
  ),
);
