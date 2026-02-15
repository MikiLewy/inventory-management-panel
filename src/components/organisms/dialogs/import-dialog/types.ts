import { ImportError, ImportResult } from '@/shared/types/import-export';
import { ParsedRow } from '@/shared/utils/import';

export type { ImportError, ImportResult, ParsedRow };

type DialogState = 'idle' | 'parsing' | 'validated' | 'importing';

export interface State {
  dialogState: DialogState;
  selectedFile: File | null;
  validationResult: ValidationResult<ParsedRow> | null;
  parseErrors: string[];
}

export type Action =
  | { type: 'SET_DIALOG_STATE'; payload: DialogState }
  | { type: 'SET_SELECTED_FILE'; payload: File }
  | { type: 'SET_VALIDATION_RESULT'; payload: ValidationResult<ParsedRow> | null }
  | { type: 'SET_PARSE_ERRORS'; payload: string[] }
  | { type: 'RESET' };

export const initialState: State = {
  dialogState: 'idle',
  selectedFile: null,
  validationResult: null,
  parseErrors: [],
};

export interface ValidationResult<T> {
  validRows: T[];
  errors: ImportError[];
}
