import { StoreInterface } from '../store';

export const spinnerOfUiSelector = (state: StoreInterface) => {
  return state.ui.isLoading;
};

export const spinnerOfPageUiSelector = (state: StoreInterface) => {
  return state.ui.pageLoading;
};

export const loadingMapSelector = (state: StoreInterface) => {
  return state.ui.loadingMap;
};
