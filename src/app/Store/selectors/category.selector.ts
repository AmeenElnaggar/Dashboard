import { StoreInterface } from '../store';

export const createdCategoriesResponseSelector = (state: StoreInterface) => {
  return state.categories.createdCategoriesResponse;
};

export const allCategoriesSelector = (state: StoreInterface) => {
  return state.categories.allCategories;
};
