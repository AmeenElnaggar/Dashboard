import { StoreInterface } from '../store';

export const switchThemeSelector = (state: StoreInterface) => {
  return state.theme.isDarkMode;
};

export const getThemeSelector = (state: StoreInterface) => {
  return state.theme.themeMode;
};
