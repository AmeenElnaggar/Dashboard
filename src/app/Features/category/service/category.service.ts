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
import { Category } from '../models/category.model';
import { allCategoriesSelector } from '../../../Store/selectors/category.selector';
import { SpinnerService } from '../../../Shared/services/spinner.service';
import {
  retriveDialogAction,
  switchDialogModeAction,
} from '../../../Store/actions/dialog.action';
import { dialogDataSelector } from '../../../Store/selectors/dialog.selector';
import { UploadService } from '../../../Shared/services/upload.service';
import { spinnerOfPageUiSelector } from '../../../Store/selectors/ui.selector';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private store = inject(Store<StoreInterface>);
  private uploadService = inject(UploadService);
  allCategories$: Observable<any> = this.store.select(allCategoriesSelector);

  enteredName = signal<string>('');

  getEnteredName(name: string) {
    this.enteredName.set(name);
  }

  savedImage = signal<string>('');
  savedCategoryId = signal<string>('');

  dialogData$ = this.uploadService.dialogData$
    .pipe(filter((response) => response))
    .subscribe((res) => {
      this.enteredName.set(res.name);
      this.savedImage.set(res.image.secure_url);
      this.savedCategoryId.set(res.id);
    });

  fetchAllCategoriesData(enteredData: {
    enteredSize: string;
    enteredPage: string;
  }) {
    this.store.dispatch(
      fetchAllCategoriesAction({
        page: enteredData.enteredPage,
        size: enteredData.enteredSize!,
      })
    );
  }

  createCategory(enteredImages: any) {
    const formData = new FormData();
    formData.append('name', this.enteredName());
    if (enteredImages.image) {
      formData.append('image', enteredImages.image[0]);
    }
    this.store.dispatch(createCategoryAction({ categoryData: formData }));
  }

  deleteCategory(id: string) {
    this.store.dispatch(deleteCategoryAction({ categoryId: id }));
  }

  async editCategory(enteredImage: any) {
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

  private paginationKey = 'categoryPagination';

  setCategoryPagination(paginationData: {
    currentRow: number;
    currentRows: number;
    currentPage: number;
  }) {
    localStorage.setItem(this.paginationKey, JSON.stringify(paginationData));
  }

  getCategoryPagination() {
    const storedData = localStorage.getItem(this.paginationKey);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      // القيم الافتراضية لو مفيش بيانات محفوظة
      return { currentRow: 0, currentRows: 1, currentPage: 1 };
    }
  }
}
