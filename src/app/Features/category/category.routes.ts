import { Routes } from '@angular/router';
import { SubcategoryPageComponent } from '../subcategory/page/subcategory-page/subcategory-page.component';
import { CategoryPageComponent } from './page/category-page/category-page.component';

export const routes: Routes = [
  {
    path: ':categoryName/subcategories',
    loadComponent: () =>
      import(
        '../subcategory/page/subcategory-page/subcategory-page.component'
      ).then((response) => response.SubcategoryPageComponent),
  },
];
