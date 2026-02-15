import { Action, initialState, State } from './types';

export const importDialogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIALOG_STATE':
      return { ...state, dialogState: action.payload };
    case 'SET_SELECTED_FILE':
      return { ...state, selectedFile: action.payload };
    case 'SET_VALIDATION_RESULT':
      return { ...state, validationResult: action.payload };
    case 'SET_PARSE_ERRORS':
      return { ...state, parseErrors: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
