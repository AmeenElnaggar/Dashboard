import { ActionReducerMap } from '@ngrx/store';
import * as fromSidenav from './reducers/sidenav.reducer';
import * as fromTheme from './reducers/theme.reducer';
import * as fromAuthentication from './reducers/auth.reducer';
import * as fromUi from './reducers/ui.reducer';
import * as fromCategories from './reducers/category.reducer';

export interface StoreInterface {
  sidenav: fromSidenav.State;
  theme: fromTheme.State;
  auth: fromAuthentication.State;
  ui: fromUi.State;
  categories: fromCategories.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  sidenav: fromSidenav.sidenavReducer,
  theme: fromTheme.themeReducer,
  auth: fromAuthentication.authReducer,
  ui: fromUi.uiReducer,
  categories: fromCategories.categoryReducer,
};
