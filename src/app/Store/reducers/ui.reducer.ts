import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,

  on(startLoadingAction, (state, action) => {
    return { ...state, isLoading: true };
  }),

  on(stopLoadingAction, (state, action) => {
    return { ...state, isLoading: false };
  })
);
