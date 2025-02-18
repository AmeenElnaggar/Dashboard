import { createReducer, on } from '@ngrx/store';
import { switchSidennavModeAction } from '../actions/sidenav.action';

export interface State {
  visible: boolean;
}

const initialState: State = {
  visible: false,
};

export const sidenavReducer = createReducer(
  initialState,
  on(switchSidennavModeAction, (state, action) => {
    return { visible: !state.visible };
  })
);
