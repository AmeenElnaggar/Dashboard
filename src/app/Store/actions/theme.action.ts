import { createAction, props } from '@ngrx/store';

export const switchThemeAction = createAction('[Theme] Switch Theme Mode');
export const getThemeAction = createAction(
  '[Theme] Get Theme Mode',
  props<{ payload: boolean }>()
);
