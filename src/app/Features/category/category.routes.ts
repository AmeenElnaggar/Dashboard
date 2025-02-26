import { Routes } from '@angular/router';
import { SubcategoryPageComponent } from './page/subcategory-page/subcategory-page.component';
import { CategoryPageComponent } from './page/category-page/category-page.component';

export const routes: Routes = [
  {
    path: 'subcategories',
    loadComponent: () =>
      import('./page/subcategory-page/subcategory-page.component').then(
        (response) => response.SubcategoryPageComponent
      ),
  },
];
