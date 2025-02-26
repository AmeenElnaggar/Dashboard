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
  visible: boolean = false;
  onToggleDialog() {
    this.visible = !this.visible;
    if (!this.visible) {
      this.selectedImages = [];
      this.formDataFiles = [];
      this.resetInputs();
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

  @ContentChild('formSelect') selectElement!: ElementRef; // التقاط الـ <select>

  ngAfterContentInit() {
    if (this.selectElement) {
      this.selectElement.nativeElement.addEventListener(
        'change',
        (event: Event) => {
          const selectedValue = (event.target as HTMLSelectElement).value;
        }
      );
    }
    this.inputs.changes.subscribe(() => this.checkIfCanSave());
  }

  checkIfCanSave() {
    const allInputsFilled = this.inputs
      .toArray()
      .every((input) => input.nativeElement.value.trim() !== '');
    return !(allInputsFilled && this.selectedImages.length > 0);
  }

  resetInputs() {
    this.inputs.forEach((input) => {
      input.nativeElement.value = '';
    });
    if (this.selectElement) {
      this.selectElement.nativeElement.value = '';
    }
  }
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
