import { createReducer, on } from '@ngrx/store';
import { getAllCategoriesResponseAction } from '../actions/category.action';

export interface State {
  allCategories: any;
  selectedCategory: any;
}

const initialState: State = {
  allCategories: [],
  selectedCategory: '',
};

export const categoryReducer = createReducer(
  initialState,
  on(getAllCategoriesResponseAction, (state, action) => {
    return { ...state, allCategories: action.payload };
  })
);
