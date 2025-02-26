import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';

import { HttpClient } from '@angular/common/http';
import { fetchAllUsersAction } from '../actions/users.action';
import { of, switchMap, tap } from 'rxjs';

export class UsersEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  usersEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchAllUsersAction),
        switchMap(() => {
          return this.httpClient
            .get(
              'https://clothingapp-production-681d.up.railway.app/api/v1/admin/users',
              {
                params: { isDeleted: 'false' },
              }
            )
            .pipe(tap((res) => console.log(res)));
        })
      ),
    { dispatch: false }
  );
}
