import { StoreInterface } from '../store';

export const spinnerOfUiSelector = (state: StoreInterface) => {
  return state.ui.isLoading;
};
