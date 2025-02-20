import { Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/page/home-page/home-page.component';
import { AllUsersPageComponent } from './Features/users/page/users-page/allusers-page.component';
// import { authGuard } from './Core/guards/auth.guard';
// import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'allusers', component: AllUsersPageComponent },
  // { path: 'login', component: LoginPageComponent },
];
