import { Component, inject, signal } from '@angular/core';
import { UploadComponent } from '../../../../Shared/components/upload/upload.component';
import { UploadedImages } from '../../../../Shared/models/uploadedImages.model';
import { CategoryService } from '../../../category/service/category.service';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subcategory-upload',
  standalone: true,
  imports: [UploadComponent, FormsModule, AsyncPipe, Select, NgClass],
  templateUrl: './subcategory-upload.component.html',
  styleUrl: './subcategory-upload.component.css',
})
export class SubcategoryUploadComponent {
  private categoryService = inject(CategoryService);

  allCategoriesData$: Observable<any> = this.categoryService.allCategories$;

  enteredName = signal<string>('');

  selectedCity: '' | undefined;
  onUploadCategory(event: { imagesData: UploadedImages }) {
    const { images } = event.imagesData;
    this.categoryService.createCategory({
      image: images[0],
      name: this.enteredName(),
    });
  }
}
