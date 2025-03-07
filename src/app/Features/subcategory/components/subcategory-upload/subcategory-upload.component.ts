import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { UploadComponent } from '../../../../Shared/components/upload/upload.component';
import { UploadedImages } from '../../../../Shared/models/uploadedImages.model';
import { CategoryService } from '../../../category/service/category.service';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { AsyncPipe, NgClass } from '@angular/common';
import { map, Observable, take } from 'rxjs';
import { SubCategoryService } from '../../service/subcategory.service';
import { UploadService } from '../../../../Shared/services/upload.service';

@Component({
  selector: 'app-subcategory-upload',
  standalone: true,
  imports: [UploadComponent, FormsModule, AsyncPipe, Select, NgClass],
  templateUrl: './subcategory-upload.component.html',
  styleUrl: './subcategory-upload.component.css',
})
export class SubcategoryUploadComponent {
  private categoryService = inject(CategoryService);
  private subCategoryService = inject(SubCategoryService);
  private uploadService = inject(UploadService);
  enteredCategory = viewChild<ElementRef<HTMLSelectElement>>('formSelect');

  allCategoriesData$: Observable<any> = this.categoryService.allCategories$;

  enteredName = signal<string>('');
  onSaveSubCategory(event: { imageFiles: File[] }) {
    this.uploadService.dialogMode$
      .pipe(
        map((response: any) => response.isEditing),
        take(1)
      )
      .subscribe((response: any) => {
        if (response) {
          if (this.enteredName() && this.enteredCategory()) {
            this.subCategoryService.getCategoryName(
              this.enteredCategory()!.nativeElement.value
            );
            this.subCategoryService.getEnteredName(this.enteredName());
          }
          this.subCategoryService.editSubCategory({
            image: event.imageFiles,
          });
        } else {
          this.subCategoryService.getCategoryName(
            this.enteredCategory()!.nativeElement.value
          );
          this.subCategoryService.getEnteredName(this.enteredName());
          this.subCategoryService.createSubCategory({
            image: event.imageFiles,
          });
        }
      });
  }
}
