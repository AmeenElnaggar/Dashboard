import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { switchSidennavModeAction } from '../../Store/actions/sidenav.action';
import { sidenavSelector } from '../../Store/selectors/sidenav.selector';
import { StoreInterface } from '../../Store/store';
import { switchThemeAction } from '../../Store/actions/theme.action';
import { getThemeSelector } from '../../Store/selectors/theme.selector';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private store = inject(Store<StoreInterface>);
  visible$: Observable<boolean> = this.store.select(sidenavSelector);
  themeMode$: Observable<boolean> = this.store.select(getThemeSelector);

  navbarTitle = signal<string>('');

  changeTheme() {
    this.store.dispatch(switchThemeAction());
  }

  changeVisible() {
    this.store.dispatch(switchSidennavModeAction());
  }

  changeNavbarTitle(title: string) {
    this.navbarTitle.set(title);
  }
}
