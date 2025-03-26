import { createAction, props } from '@ngrx/store';
import {
  AuthData,
  LoginData,
} from '../../Features/Authentication/model/authdata.model';

export const fetchAuthAction = createAction(
  '[Authentication] Send Request To Api',
  props<{ loginData: LoginData }>()
);

export const getAuthDataAction = createAction(
  '[Authentication] Get User Data',
  props<{ authData: any }>()
);

export const getAuthModeAction = createAction(
  '[Authentication] Get User Mode',
  props<{ mode: boolean }>()
);

export const refreshAction = createAction(
  '[Authentication] Refresh Access Token'
);
