import { createReducer, on } from '@ngrx/store';
import { switchThemeAction } from '../actions/theme.action';
import { getThemeAction } from '../actions/theme.action';

export interface State {
  themeMode: boolean;
  isDarkMode: boolean;
}

const initialState: State = {
  themeMode: false,
  isDarkMode: false,
};

export const themeReducer = createReducer(
  initialState,
  on(getThemeAction, (state, action) => ({
    ...state,
    themeMode: action.payload,
    isDarkMode: action.payload,
  })),
  on(switchThemeAction, (state) => {
    const newTheme = !state.isDarkMode;
    return { ...state, isDarkMode: newTheme, themeMode: newTheme };
  })
);
