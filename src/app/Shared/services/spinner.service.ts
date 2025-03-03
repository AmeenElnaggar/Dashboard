import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadingMapSelector,
  spinnerOfPageUiSelector,
  spinnerOfUiSelector,
} from '../../Store/selectors/ui.selector';
import { StoreInterface } from '../../Store/store';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private store = inject(Store<StoreInterface>);
  private messageService = inject(MessageService);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);

  loadingMap$: Observable<{ [key: string]: boolean }> =
    this.store.select(loadingMapSelector);

  pageLoading$: Observable<boolean> = this.store.select(
    spinnerOfPageUiSelector
  );

  showMessages(response: any) {
    if (response.Success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message,
        life: 3000,
      });
    } else if (response?.error?.message) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: response.error.message,
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong, Please try again later.',
        life: 3000,
      });
    }
  }
}
