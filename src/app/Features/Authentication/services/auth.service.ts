import { inject, Injectable } from '@angular/core';
import { AuthData, LoginData } from '../model/authdata.model';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { Observable, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  fetchAuthAction,
  getAuthModeAction,
} from '../../../Store/actions/auth.action';
import {
  authDataSelector,
  authModeSelector,
} from '../../../Store/selectors/auth.selector';
import { spinnerOfUiSelector } from '../../../Store/selectors/ui.selector';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private store = inject(Store<StoreInterface>);
  private router = inject(Router);

  authData$ = this.store.select(authDataSelector);
  authMode$ = this.store.select(authModeSelector);

  constructor() {
    this.listenToStorageChanges();
  }

  submitLogin(enteredData: LoginData) {
    this.store.dispatch(fetchAuthAction({ loginData: enteredData }));
    this.navigateToHomePage();
  }

  navigateToHomePage() {
    this.authData$.subscribe((res: AuthData) => {
      if (res.success) {
        this.router.navigate([''], { replaceUrl: true });
      }
    });
  }

  private listenToStorageChanges() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'Auth') {
        const isAuth = event.newValue === 'true';
        this.store.dispatch(getAuthModeAction({ mode: isAuth }));
      }
    });
  }

  isAuthenticated() {
    let isAuth = localStorage.getItem('Auth') === 'true';
    this.store.dispatch(getAuthModeAction({ mode: isAuth }));
  }

  submitLogout() {
    localStorage.removeItem('Auth');
    this.store.dispatch(getAuthModeAction({ mode: false }));
  }
}
