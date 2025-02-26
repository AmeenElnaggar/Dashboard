import { Routes } from '@angular/router';
<<<<<<< HEAD
import { HomePageComponent } from './Features/home/page/home-page/home-page.component';
import { AllUsersPageComponent } from './Features/users/page/users-page/allusers-page.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
import { authGuard, loginGuard } from './Core/guards/auth.guard';
=======
import { authGuard, loginGuard } from './Core/guards/auth.guard';
import { routes as subCategoryRoute } from './Features/category/category.routes';
>>>>>>> 490d315 (Add Category Logic)

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Features/home/page/home-page/home-page.component').then(
        (response) => response.HomePageComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'allusers',
    loadComponent: () =>
      import('./Features/users/page/users-page/allusers-page.component').then(
        (response) => response.AllUsersPageComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './Features/Authentication/page/login-page/login-page.component'
      ).then((response) => response.LoginPageComponent),
    canMatch: [loginGuard],
  },
<<<<<<< HEAD
=======
  {
    path: 'products',
    loadComponent: () =>
      import(
        './Features/products/page/products-page/products-page.component'
      ).then((response) => response.ProductsPageComponent),
    canMatch: [authGuard],
  },
  {
    path: 'categories',
    loadComponent: () =>
      import(
        './Features/category/page/category-page/category-page.component'
      ).then((response) => response.CategoryPageComponent),
    canMatch: [authGuard],
    children: subCategoryRoute,
  },
>>>>>>> 490d315 (Add Category Logic)
  { path: '**', redirectTo: '/login' },
];
