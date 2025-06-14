import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

interface UseSelection {
  selectedRows: RowSelectionState;
  setSelectedRows: OnChangeFn<RowSelectionState>;
  handleClearSelected: () => void;
}

export function useSelection(): UseSelection {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const handleClearSelected = (): void => {
    setSelectedRows({});
  };

  return { selectedRows, setSelectedRows, handleClearSelected };
}
