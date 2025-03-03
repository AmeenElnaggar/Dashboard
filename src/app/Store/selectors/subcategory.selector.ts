import { StoreInterface } from '../store';

export const allSubCategoriesSelector = (state: StoreInterface) => {
  return state.categories.allCategories;
};
