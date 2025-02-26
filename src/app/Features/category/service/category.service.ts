import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../Store/store';
import { Observable } from 'rxjs';
import { createCategoryAction } from '../../../Store/actions/category.action';
import { createdCategoriesResponseSelector } from './../../../Store/selectors/category.selector';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private store = inject(Store<StoreInterface>);
  createCategory(enteredData: Category) {
    enteredData = { ...enteredData, image: enteredData.image[0] };
    const formData = new FormData();
    formData.append('name', enteredData.name);
    if (enteredData.image) {
      formData.append('image', enteredData.image);
    }

    this.store.dispatch(createCategoryAction({ categoryData: formData }));
  }

  // ----------------------------------------------------

  categories = signal([2]);

  createdCategoriesResponse$: Observable<any> = this.store.select(
    createdCategoriesResponseSelector
  );
}
