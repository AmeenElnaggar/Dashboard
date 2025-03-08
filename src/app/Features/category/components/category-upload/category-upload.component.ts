import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Dialog } from 'primeng/dialog';
import { debounce, map, Observable, take } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UploadComponent } from '../../../../Shared/components/upload/upload.component';
import { FormsModule } from '@angular/forms';
import { UploadedImages } from '../../../../Shared/models/uploadedImages.model';
import { UploadService } from '../../../../Shared/services/upload.service';

@Component({
  selector: 'app-category-upload',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    AsyncPipe,
    NgIf,
    FormsModule,
    UploadComponent,
  ],
  templateUrl: './category-upload.component.html',
  styleUrl: './category-upload.component.css',
})
export class CategoryUploadComponent {
  private categoryService = inject(CategoryService);
  private uploadService = inject(UploadService);
  private destroyRef = inject(DestroyRef);
  enteredName = signal<string>('');
  dialogTitle: string = '';

  ngOnInit() {
    const subscribtion = this.uploadService.dialogMode$
      .pipe(
        map((response: any) =>
          response.isEditing ? 'Edit Category' : 'Add Category'
        )
      )
      .subscribe((response) => (this.dialogTitle = response));
    this.destroyRef.onDestroy(() => subscribtion.unsubscribe());
  }

  onSaveCategory(event: { imageFiles: File[] }) {
    this.uploadService.dialogMode$
      .pipe(
        map((response: any) => response.isEditing),
        take(1)
      )
      .subscribe((response: any) => {
        if (response) {
          if (this.enteredName()) {
            this.categoryService.getEnteredName(this.enteredName());
          }
          this.categoryService.editCategory({
            image: event.imageFiles,
          });
        } else {
          this.categoryService.getEnteredName(this.enteredName());
          this.categoryService.createCategory({
            image: event.imageFiles,
          });
        }
      });
  }

  // onSaveCategory(event: { imageFiles: File[] }) {
  //   this.categoryService.getEnteredName(this.enteredName());
  //   this.categoryService.createCategory({
  //     image: event.imageFiles,
  //   });
  // }
}
