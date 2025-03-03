import { createReducer, on } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';

export interface State {
  isLoading: boolean;
  loadingMap: { [key: string]: boolean };
  pageLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  loadingMap: {},
  pageLoading: false,
};

export const uiReducer = createReducer(
  initialState,

  on(startLoadingAction, (state, action) => {
    let pageisLoading = false;
    if (action.id === 'c') {
      pageisLoading = true;
    }
    return {
      ...state,
      pageLoading: pageisLoading,
      loadingMap: { ...state.loadingMap, [action.id!]: true },
      isLoading: true,
    };
  }),
  on(stopLoadingAction, (state, action) => {
    let pageisLoading = false;
    if (action.id === 'c') {
      pageisLoading = false;
    }
    return {
      ...state,
      pageLoading: pageisLoading,
      loadingMap: { ...state.loadingMap, [action.id!]: false },
      isLoading: false,
    };
  })
);
