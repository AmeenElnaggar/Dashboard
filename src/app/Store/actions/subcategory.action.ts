import { createAction, props } from '@ngrx/store';

export const fetchAllSubCategoriesAction = createAction(
  '[SubCategories] Send Request To Backend'
);

export const getAllSubCategoriesResponseAction = createAction(
  '[SubCategories] Get All SubCategories Data',
  props<{ payload: any }>()
);

export const createSubCategoryAction = createAction(
  '[SubCategories] Create SubCategory',
  props<{ subCategoryData: FormData }>()
);

export const deleteSubCategoryAction = createAction(
  '[SubCategories] Delete Specific SubCategory',
  props<{ subcategoryId: string }>()
);

// -------------------------------------------------------------------

export const editSubCategoryAction = createAction(
  '[SubCategories] Edit Specific SubCategory',
  props<{ subcategoryData: FormData; id: string }>()
);

export const getEditedSubCategoryResponseAction = createAction(
  '[subCategories] Get Edited SubCategory Data',
  props<{ payload: any }>()
);

// -----------------------------------
