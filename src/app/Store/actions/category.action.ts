import { createAction, props } from '@ngrx/store';

export const fetchAllCategoriesAction = createAction(
  '[Categories] Send Request To Backend',
  props<{ size?: string; page?: string }>()
);

export const getAllCategoriesResponseAction = createAction(
  '[Categories] Get All Categories Data',
  props<{ payload: any }>()
);

export const createCategoryAction = createAction(
  '[Categories] Create Category',
  props<{ categoryData: FormData }>()
);

export const deleteCategoryAction = createAction(
  '[Categories] Delete Specific Category',
  props<{ categoryId: string }>()
);

// -------------------------------------------------------------------

export const editCategoryAction = createAction(
  '[Categories] Edit Specific Category',
  props<{ categoryData: FormData; id: string }>()
);

export const getEditedCategoryResponseAction = createAction(
  '[Categories] Get Edited Category Data',
  props<{ payload: any }>()
);

// -----------------------------------

export const searchCategoryAction = createAction(
  '[Categories] Search for Specific Category',
  props<{ searchKey: string; currentPage: string }>()
);

export const getSearchCategoryResponseAction = createAction(
  '[Categories] Get Search Category Data',
  props<{ payload: any }>()
);
