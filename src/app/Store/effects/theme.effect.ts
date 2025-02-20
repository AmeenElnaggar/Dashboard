import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import { getThemeAction, switchThemeAction } from '../actions/theme.action';
import { defer, of, switchMap, take } from 'rxjs';
import { switchThemeSelector } from '../selectors/theme.selector';

export class ThemeEffect {
  private store = inject(Store<StoreInterface>);
  private actions$ = inject(Actions);

  loadTheme = createEffect(() =>
    defer(() => {
      let themeMode = localStorage.getItem('Dark Mode');
      let parsedTheme = themeMode ? JSON.parse(themeMode) : false;
      return of(getThemeAction({ payload: parsedTheme }));
    })
  );

  switchTheme = createEffect(() =>
    this.actions$.pipe(
      ofType(switchThemeAction),
      switchMap(() =>
        this.store.select(switchThemeSelector).pipe(
          take(1),
          switchMap((response: boolean) => {
            localStorage.setItem('Dark Mode', JSON.stringify(response));
            return of(getThemeAction({ payload: response }));
          })
        )
      )
    )
  );
}
