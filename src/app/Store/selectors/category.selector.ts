import { StoreInterface } from '../store';

export const allCategoriesSelector = (state: StoreInterface) => {
  return state.categories.allCategories;
};
