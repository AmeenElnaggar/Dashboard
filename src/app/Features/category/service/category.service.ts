import { effect, inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
} from 'rxjs';
import {
  createCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchAllCategoriesAction,
  searchCategoryAction,
} from '../../../Store/actions/category.action';
import { Category } from '../models/category.model';
import {
  allCategoriesSelector,
  searchCategoriesSelector,
} from '../../../Store/selectors/category.selector';
import { SpinnerService } from '../../../Shared/services/spinner.service';
import {
  retriveDialogAction,
  switchDialogModeAction,
} from '../../../Store/actions/dialog.action';
import { dialogDataSelector } from '../../../Store/selectors/dialog.selector';
import { UploadService } from '../../../Shared/services/upload.service';
import { spinnerOfPageUiSelector } from '../../../Store/selectors/ui.selector';
import { Pagination } from '../../../Shared/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private store = inject(Store<StoreInterface>);
  private uploadService = inject(UploadService);

  searchValue: string = '';

  allCategories$: Observable<any> = this.store.select(allCategoriesSelector);
  searchCategories$: Observable<any> = this.store.select(
    searchCategoriesSelector
  );

  filterdCategories$: Observable<any> = combineLatest([
    this.allCategories$,
    this.searchCategories$,
  ]).pipe(
    map(([categories, searchCategories]) => {
      return searchCategories.data && this.searchValue !== ''
        ? searchCategories
        : categories;
    })
  );

  // searchValue(value: string) {
  //   this.searchSubject.next(value);
  // }

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

  // ----------------------------------------------------

  categories = signal([1]);

  getCategoryPagination() {
    let pagination: any = localStorage.getItem('Category-Pagination');
    pagination = pagination
      ? JSON.parse(pagination)
      : { currentPage: 1, currentRows: 1, first: 0 };

    return pagination;
  }

  setCategoryPagination(paginationData: Pagination) {
    localStorage.setItem(
      'Category-Pagination',
      JSON.stringify({
        currentPage: paginationData.currentPage,
        currentRows: paginationData.currentRows,
        first: paginationData.first,
      })
    );
  }

  searchCategory(searchData: { value: string; page: string }) {
    this.searchValue = searchData.value;
    this.store.dispatch(
      searchCategoryAction({
        searchKey: searchData.value,
        currentPage: searchData.page,
      })
    );
  }
}
