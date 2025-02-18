import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';

export class AuthenticationEffect {
  // private store = inject(Store<StoreInterface>);
  // private actions$ = inject(Actions);
  // loginEffect = createEffect(() => this.actions$.pipe(ofType()));
}
