import { ActionReducerMap } from '@ngrx/store';
import * as fromSidenav from './reducers/sidenav.reducer';
import * as fromTheme from './reducers/theme.reducer';

export interface StoreInterface {
  sidenav: fromSidenav.State;
  theme: fromTheme.State;
}

export const reducers: ActionReducerMap<StoreInterface> = {
  sidenav: fromSidenav.sidenavReducer,
  theme: fromTheme.themeReducer,
};

/*
<div class="sm:m-7 m-3">
  <!-- Sidenav , Navbar -->
  <div class="grid grid-cols-12">
    <div
      [class]="{
        'col-span-2':isVisible$ | async,
      }"
    >
      <app-sidenav />
    </div>
    <div
      [class]="{
    'col-span-10':isVisible$ | async,
    'col-span-12':!(isVisible$ | async),
  }"
    >
      <app-navbar />
      <div class="mt-5">
        <div class="block sm:hidden mb-4 ml-1">
          <app-dashboard-title title="E-Commerce Dashboard" />
        </div>
        <!-- <router-outlet /> -->
      </div>
    </div>
  </div>
</div>

*/
