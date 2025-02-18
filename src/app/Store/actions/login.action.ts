import { createAction, props } from '@ngrx/store';

export const getTokenAction = createAction(
  '[Token] Get Token From LocalStorage'
);

export const verifyTokenAction = createAction(
  '[Token] Verify Token',
  props<{ userToken: string }>()
);
