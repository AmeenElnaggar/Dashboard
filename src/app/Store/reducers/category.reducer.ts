import { createReducer, on } from '@ngrx/store';
import {
  createCategoryAction,
  getCategoryResponseAction,
} from '../actions/category.action';

export interface State {
  createdCategoriesResponse: any;
  allCategories: any;
}

const initialState: State = {
  createdCategoriesResponse: '',
  allCategories: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(createCategoryAction, (state, action) => {
    return { ...state };
  }),
  on(getCategoryResponseAction, (state, action) => {
    return { ...state, createdCategoriesResponse: action.payload };
  })
);
