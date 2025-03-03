import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../store';
import {
  getDialogDataAction,
  retriveDialogAction,
  switchDialogModeAction,
} from '../actions/dialog.action';
import { SpinnerService } from '../../Shared/services/spinner.service';
import { of, switchMap } from 'rxjs';

export class DialogEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);

  retriveDialogEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(retriveDialogAction),
      switchMap(({ loadedData }) => {
        this.store.dispatch(
          switchDialogModeAction({ isEditing: true, visible: true })
        );
        return of(getDialogDataAction({ data: loadedData }));
      })
    )
  );
}
