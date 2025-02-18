import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/page/home-page/home-page.component';
import { UsersPageComponent } from './Features/users/page/users-page/users-page.component';
// import { authGuard } from './Core/guards/auth.guard';
// import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersPageComponent },
  // { path: 'login', component: LoginPageComponent },
];
