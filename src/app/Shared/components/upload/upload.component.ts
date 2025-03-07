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
  private uploadService = inject(UploadService);
  private categoryService = inject(CategoryService);
  visible: boolean = false;
  ngOnInit() {
    this.uploadService.dialogMode$
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.uploadService.dialogData$
        .pipe(filter((response) => response))
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
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }

  onSwitchDialogMode(status: { visible: boolean; editing: boolean }) {
    this.uploadService.switchDialogMode(status.visible, status.editing); // 1 DM
  }

  resetDialog() {
    this.uploadService.resetImagesData();
    this.resetForm();
  }

  isEditing$: Observable<boolean> = this.uploadService.dialogMode$.pipe(
    map((response) => response.isEditing)
  );

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

  formDataFiles: File[] = [];
  selectedImages: (string | ArrayBuffer)[] = [];
  onFileSelected(event: Event) {
    this.uploadService.fileSelected(event, this.isMultiple());
  }

  constructor() {
    effect(
      () => (
        (this.selectedImages = this.uploadService.selectedImages()),
        (this.formDataFiles = this.uploadService.formDataFiles())
      )
    );
  }

  saveData = output<{ imageFiles: File[] }>();
  onSave() {
    this.saveData.emit({ imageFiles: this.formDataFiles });
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

  private lastCheckResult: boolean = false;

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

  resetForm() {
    this.inputs.forEach((input) => {
      input.nativeElement.value = '';
    });
    this.selects.forEach((select) => {
      select.nativeElement.value = '';
    });
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

  // ------------------------------------------
}

//   !(allInputsFilled && this.selectedImages.length > 0

/*
import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  ContentChildren,
  contentChildren,
  ElementRef,
  EventEmitter,
  inject,
  input,
  output,
  QueryList,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UploadedImages } from '../../models/uploadedImages.model';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
  import { SpinnerService } from './../../services/spinner.service';
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
  visible: boolean = true;
  onToggleDialog() {
    this.visible = !this.visible;
    if (!this.visible) {
      this.resetForm();
    }
  }
  // ------------------------------------------
  dialogTitle = input.required<string>();
  isMultiple = input.required<boolean>();
  // ------------------------------------------

  private spinnerService = inject(SpinnerService);
  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  // ------------------------------------------

  selectedImages: (string | ArrayBuffer)[] = [];
  get allSelectedImages() {
    return this.isMultiple()
      ? this.selectedImages
      : this.selectedImages.slice(-1);
  }
  // ------------------------------------------
  saveData = output<{ imageFiles: File[] }>();
  onSave() {
    this.saveData.emit({ imageFiles: this.formDataFiles });
  }
  // ------------------------------------------

  formDataFiles: File[] = [];
  onFileSelected(event: Event) {
    // الفاليو
    const input = event.target as HTMLInputElement;
    // بتشيك لو في فايلات المستخدم اختارها
    if (input.files && input.files.length > 0) {
      // بحولها الي اراي
      const files = Array.from(input.files);
      // بلوب ع الفايلات اللي المستخدم اختارها
      files.forEach((file) => {
        // بكريت اوبجيكت من كلاس ده عشان احول الصوره الي base64
        const reader = new FileReader();
        // بنفذ الميثود دي
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        // ده مربط الفرس اللي بياخد الملف يبعته لل fileReader ويشغل بعدها onLoad()
        reader.readAsDataURL(file);
        this.formDataFiles.push(file);
      });
    }
  }

  // ------------------------------------------
  @ContentChildren('formInput', { descendants: true }) inputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;
  @ContentChildren('formSelectt', { descendants: true })
  selects!: QueryList<any>;

  @ContentChild('formSelect') selectElement!: ElementRef;

  resetSelect() {
    if (this.selectElement) {
      const selectComponent = this.selectElement.nativeElement;
      selectComponent.value = ''; // تصفير القيمة
      selectComponent.dispatchEvent(new Event('change')); // إجبار Angular على ملاحظة التغيير
    }
  }

  ngAfterContentInit() {
    this.inputs.changes.subscribe(() => this.isFormValid());
    console.log(this.selectElement); // تأكد أنه تم التقاط العنصر
  }

  isFormValid(): boolean {
    const allInputsFilled = this.inputs
      .toArray()
      .every((input) => input.nativeElement.value.trim() !== '');
    const allSelectsFilled = this.selects
      .toArray()
      .every((select) => select.ngModel);
    const imageUploaded = this.allSelectedImages.length > 0;

    return !(allInputsFilled && allSelectsFilled && imageUploaded);
  }

  resetForm() {
    this.inputs.forEach((input) => (input.nativeElement.value = ''));
    this.resetSelect();
    this.selectedImages = [];
    this.formDataFiles = [];
  }
}

*/
