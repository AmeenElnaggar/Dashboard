import { createReducer, on } from '@ngrx/store';
import {
  getDialogDataAction,
  switchDialogModeAction,
} from '../actions/dialog.action';

export interface State {
  visible: boolean;
  isEditing: boolean;
  dialogData: any;
}

const initialState: State = {
  visible: false,
  isEditing: false,
  dialogData: '',
};

export const dialogReducer = createReducer(
  initialState,
  on(switchDialogModeAction, (state, action) => {
    return { ...state, visible: action.visible, isEditing: action.isEditing }; // 3
  }),
  on(getDialogDataAction, (state, action) => {
    return {
      ...state,
      dialogData: { ...action.data, _timestamp: Date.now() },
    };
  })
);
