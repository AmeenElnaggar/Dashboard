import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  ContentChildren,
  contentChildren,
  DestroyRef,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
  output,
  QueryList,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UploadedImages } from '../../models/uploadedImages.model';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  Observable,
  pairwise,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { UploadService } from '../../services/upload.service';
import { CategoryService } from '../../../Features/category/service/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    NgIf,
    FormsModule,
    AsyncPipe,
    SpinnerComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  // 1
  onSwitchDialogMode(status: { visible: boolean; editing: boolean }) {
    this.uploadService.switchDialogMode(status.visible, status.editing);
  }

  // 2
  private uploadService = inject(UploadService);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const subscribtion = this.uploadService.dialogMode$
      .pipe(
        map((response: any) => response.visible),
        pairwise()
      )
      .subscribe(([prev, curr]) => {
        this.visible = curr;
        if (prev && !curr) {
          this.resetDialog();
        }
      });
    this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
  }
  visible: boolean = false;

  // 3
  onFileSelected(event: Event) {
    this.uploadService.fileSelected(event, this.isMultiple());
  }

  // 4
  constructor() {
    effect(() => {
      this.selectedImages = this.uploadService.selectedImages();
      this.formDataFiles = this.uploadService.formDataFiles();
    });
  }

  // 5
  formDataFiles: File[] = [];
  selectedImages: (string | ArrayBuffer)[] = [];

  // 6
  saveData = output<{ imageFiles: File[] }>();
  onSave() {
    this.saveData.emit({ imageFiles: this.formDataFiles });
  }

  // 7
  resetForm() {
    this.inputs.forEach((input) => {
      input.nativeElement.value = '';
    });
    this.selects.forEach((select) => {
      select.nativeElement.value = '';
    });
  }

  // 8
  resetDialog() {
    this.uploadService.resetImagesData();
    this.resetForm();
    this.uploadService.clearDialogData();
  }

  // -----------------------------------------------

  private categoryService = inject(CategoryService);
  private destroy$ = new Subject<void>();

  ngAfterViewInit() {
    setTimeout(() => {
      const subscribtion = this.uploadService.dialogData$
        .pipe(
          filter((response) => response),
          takeUntil(this.destroy$) // 🔹 وقف الاشتراك عند تدمير الـ Component
        )
        .subscribe((response: any) => {
          if (!this.selectedImages.includes(response.image.secure_url)) {
            this.selectedImages.push(response.image.secure_url);
          }
          this.inputs.forEach((input) => {
            const fieldType = input.nativeElement.dataset['field'];
            switch (fieldType) {
              case 'categoryName':
                input.nativeElement.value = response.name;
                this.categoryService.getEnteredName(response.name);
                break;
              default:
                input.nativeElement.value = '';
            }
          });
        });
    }, 0);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // -----------------------------------------------

  isEditing$: Observable<boolean> = this.uploadService.dialogMode$.pipe(
    map((response) => response.isEditing)
  );

  /*
   *
   * *
   *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   *
   */

  /*
   *
   **
   *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   *
   */

  @ContentChildren('formInput', { descendants: true }) inputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  @ContentChildren('formSelect', { descendants: true })
  selects!: QueryList<any>;

  ngAfterContentInit() {
    if (this.selects) {
      this.selects.forEach((select) =>
        select.nativeElement.addEventListener('change', (event: Event) => {
          const selectedValue = (event.target as HTMLSelectElement).value;
        })
      );
    }
    this.inputs.changes.subscribe(() => this.isFormValid());
  }

  isFormValid(): boolean {
    const allInputsFilled = this.inputs
      .toArray()
      .every((input) => input.nativeElement.value.trim() !== '');
    const allSelectsFilled = this.selects.toArray().every((select) => {
      return select.nativeElement.value !== '';
    });
    const imageUploaded = this.selectedImages.length > 0;
    return !(allInputsFilled && allSelectsFilled && imageUploaded);
  }

  /*
   *
   **
   *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   * *
   * *
   * **
   * *
   * *
   * *
   * *
   *
   */

  // ------------------------------------------
  dialogTitle = input.required<string>();
  isMultiple = input.required<boolean>();
  private spinnerService = inject(SpinnerService);
  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
}
