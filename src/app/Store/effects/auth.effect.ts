import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { AuthService } from '../../Features/Authentication/services/auth.service';
import {
  fetchAuthAction,
  getAuthDataAction,
  getAuthModeAction,
  refreshAction,
} from '../actions/auth.action';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';

export class AuthenticationEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  authEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAuthAction),
      tap(() => this.store.dispatch(startLoadingAction({}))),
      switchMap(({ loginData }) => {
        return this.httpClient
          .post(
            'https://clothingapp-production-681d.up.railway.app/api/v1/auth/login',
            {
              email: loginData.email,
              password: loginData.password,
            },
            {
              withCredentials: true,
            }
          )
          .pipe(
            mergeMap((responseSuccess: any) => {
              localStorage.setItem('Auth', responseSuccess.success);
              this.store.dispatch(stopLoadingAction({}));

              return [
                getAuthDataAction({ authData: responseSuccess }),
                getAuthModeAction({ mode: true }),
              ];
            }),
            catchError((responseError: any) => {
              this.store.dispatch(stopLoadingAction({}));
              return of(getAuthDataAction({ authData: responseError }));
            })
          );
      })
    )
  );

  refreshEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshAction),
        switchMap(() =>
          this.httpClient
            .get(
              'https://clothingapp-production-681d.up.railway.app/api/v1/auth/refresh_token',
              { withCredentials: true }
            )
            .pipe(
              tap((res) => console.log('Success', res)),
              catchError((error: any) => {
                console.log('Error', error);
                return '';
              })
            )
        )
      ),
    { dispatch: false }
  );
}
