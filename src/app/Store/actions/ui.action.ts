import { createAction, props } from '@ngrx/store';

export const startLoadingAction = createAction(
  '[UI] Start Loading',
  props<{ id?: string }>()
);
export const stopLoadingAction = createAction(
  '[UI] Stop Loading',
  props<{ id?: string }>()
);
