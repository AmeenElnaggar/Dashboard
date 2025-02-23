import { createReducer, on } from '@ngrx/store';
import { AuthData } from '../../Features/Authentication/model/authdata.model';
import { getAuthDataAction, getAuthModeAction } from '../actions/auth.action';

export interface State {
  authData: any;
  authMode: string;
}

const initialState: State = {
  authData: { data: '', message: '', success: false },
  authMode: 'Login',
};

export const authReducer = createReducer(
  initialState,
  on(getAuthDataAction, (state, action) => {
    return { ...state, authData: action.authData };
  }),
  on(getAuthModeAction, (state, action) => {
    const authStatus = action.mode === true ? 'Logout' : 'Login';
    return { ...state, authMode: authStatus };
  })
);
