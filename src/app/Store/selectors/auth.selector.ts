import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const selectAuthState = (state: StoreInterface) => state.auth;

export const authDataSelector = createSelector(selectAuthState, (authState) => {
  return authState.authData;
});

export const authModeSelector = createSelector(selectAuthState, (authState) => {
  return authState.authMode;
});
