import { createAction, props } from '@ngrx/store';

export const createCategoryAction = createAction(
  '[Categories] Create Category',
  props<{ categoryData: FormData }>()
);

export const getCategoryResponseAction = createAction(
  '[Categories] Get Category Response',
  props<{ payload: any }>()
);
