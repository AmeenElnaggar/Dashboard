import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../Store/store';
import {
  clearDialogDataAction,
  retriveDialogAction,
  switchDialogModeAction,
} from '../../Store/actions/dialog.action';
import { map, Observable } from 'rxjs';
import {
  dialogDataSelector,
  dialogModeSelector,
} from '../../Store/selectors/dialog.selector';
import { Category } from '../../Features/category/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private store = inject(Store<StoreInterface>);
  dialogMode$: Observable<any> = this.store.select(dialogModeSelector);
  switchDialogMode(isVisible: boolean, editing: boolean) {
    this.store.dispatch(
      switchDialogModeAction({ visible: isVisible, isEditing: editing })
    ); // 2 DM
  }

  dialogData$: Observable<any> = this.store.select(dialogDataSelector);

  // ------------------------------------------
  selectedImages = signal<(string | ArrayBuffer)[]>([]);
  formDataFiles = signal<File[]>([]);

  fileSelected(event: Event, isMultiple: boolean) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (isMultiple) {
            this.selectedImages().push(e.target.result);
            this.formDataFiles().push(file);
          } else {
            this.formDataFiles.set([file]);
            this.selectedImages.set([e.target.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  resetImagesData() {
    this.selectedImages.set([]);
    this.formDataFiles.set([]);
  }

  retriveDialogData(enteredData: Category) {
    this.store.dispatch(retriveDialogAction({ loadedData: enteredData }));
  }

  clearDialogData() {
    this.store.dispatch(clearDialogDataAction());
  }

  async urlToFile(url: string, filename: string, mimeType: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }
}
