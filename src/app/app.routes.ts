import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/page/home-page/home-page.component';
import { AllUsersPageComponent } from './Features/users/page/users-page/allusers-page.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
import { authGuard, loginGuard } from './Core/guards/auth.guard';

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
  { path: '**', redirectTo: '/login' },
];
