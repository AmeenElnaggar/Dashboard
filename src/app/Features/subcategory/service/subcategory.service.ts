import { effect, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { filter, Observable } from 'rxjs';
import {
  createCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchAllCategoriesAction,
} from '../../../Store/actions/category.action';
import { allCategoriesSelector } from '../../../Store/selectors/category.selector';

import { UploadService } from '../../../Shared/services/upload.service';
import { allSubCategoriesSelector } from '../../../Store/selectors/subcategory.selector';
import {
  createSubCategoryAction,
  fetchAllSubCategoriesAction,
} from '../../../Store/actions/subcategory.action';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private store = inject(Store<StoreInterface>);
  private uploadService = inject(UploadService);

  allSubCategories$: Observable<any> = this.store.select(
    allSubCategoriesSelector
  );

  enteredName = signal<string>('');
  getEnteredName(name: string) {
    this.enteredName.set(name);
  }

  entredCategoryName = signal<string>('');
  getCategoryName(name: string) {
    this.entredCategoryName.set(name);
  }

  entredCategoryId = signal<string>('');
  getCategoryId(id: string) {
    console.log(id);
    this.entredCategoryId.set(id);
  }

  savedImage = signal<string>('');
  savedCategoryId = signal<string>('');

  // dialogData$ = this.uploadService.dialogData$
  //   .pipe(filter((response) => response))
  //   .subscribe((res) => {
  //     console.log(res);
  //   });

  fetchAllSubCategoriesData(subCategoriesData: {
    enteredSize: string;
    enteredPage: string;
    categoryName: string;
  }) {
    console.log(this.entredCategoryId());
    console.log(subCategoriesData);
    // this.store.dispatch(
    //   fetchAllSubCategoriesAction({
    //     page: subCategoriesData.enteredPage,
    //     size: subCategoriesData.enteredSize,
    //     categoyName: subCategoriesData.categoryName,
    //   })
    // );
  }

  createSubCategory(enteredImages: any) {
    const formData = new FormData();
    formData.append('name', this.enteredName());
    formData.append('categoryName', this.entredCategoryName());
    if (enteredImages.image) {
      formData.append('image', enteredImages.image[0]);
    }
    this.store.dispatch(
      createSubCategoryAction({
        subCategoryData: formData,
        categoryId: this.entredCategoryId(),
      })
    );
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryAction({ categoryId: id }));
  }

  async editSubCategory(enteredImage: any) {
    if (!enteredImage.image || enteredImage.image.length === 0) {
      enteredImage.image = [
        await this.uploadService.urlToFile(
          this.savedImage(),
          'image.webp',
          'image/webp'
        ),
      ];
    }

    const formData = new FormData();
    formData.append('name', this.enteredName());
    if (enteredImage.image) {
      formData.append('image', enteredImage.image[0]);
    }

    this.store.dispatch(
      editCategoryAction({ categoryData: formData, id: this.savedCategoryId() })
    );
  }

  // استخدام الفانكشن

  // ----------------------------------------------------

  categories = signal([1]);
}
