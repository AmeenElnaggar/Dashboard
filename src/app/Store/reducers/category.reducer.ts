import { createReducer, on } from '@ngrx/store';
import {
  getAllCategoriesResponseAction,
  getSearchCategoryResponseAction,
} from '../actions/category.action';

export interface State {
  allCategories: any;
  searchCategories: any;
}

const initialState: State = {
  allCategories: [],
  searchCategories: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(getAllCategoriesResponseAction, (state, action) => {
    return { ...state, allCategories: action.payload };
  }),
  on(getSearchCategoryResponseAction, (state, action) => {
    return { ...state, searchCategories: action.payload };
  })
);
