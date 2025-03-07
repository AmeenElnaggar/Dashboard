import { createReducer, on } from '@ngrx/store';
import { getAllSubCategoriesResponseAction } from '../actions/subcategory.action';

export interface State {
  allSubCategories: any;
}

const initialState: State = {
  allSubCategories: [],
};

export const subCategoryReducer = createReducer(
  initialState,
  on(getAllSubCategoriesResponseAction, (state, action) => {
    return { ...state, allSubCategories: action.payload };
  })
);
