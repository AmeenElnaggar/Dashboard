import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Dialog } from 'primeng/dialog';
import { debounce, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UploadComponent } from '../../../../Shared/components/upload/upload.component';
import { FormsModule } from '@angular/forms';
import { UploadedImages } from '../../../../Shared/models/uploadedImages.model';

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
  enteredName = signal<string>('');

  onUploadCategory(event: { imageFiles: File[] }) {
    this.categoryService.createCategory({
      image: event.imageFiles,
      name: this.enteredName(),
    });
  }

  // ngOnInit() {
  //   this.categoryService.createdCategoriesResponse$.subscribe((res) =>
  //     console.log(res)
  //   );
  // }
}
