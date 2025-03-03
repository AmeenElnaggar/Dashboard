import { createSelector } from '@ngrx/store';
import { StoreInterface } from '../store';

export const dialogModeSelector = (state: StoreInterface) => {
  return state.dialog;
};
export const dialogDataSelector = createSelector(
  dialogModeSelector,
  (state) => state.dialogData
);
