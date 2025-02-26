import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { spinnerOfUiSelector } from '../../Store/selectors/ui.selector';
import { StoreInterface } from '../../Store/store';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private store = inject(Store<StoreInterface>);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
}
