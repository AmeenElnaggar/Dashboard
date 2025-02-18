import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { HomeService } from './Features/home/services/home.service';
import { AsyncPipe } from '@angular/common';
import { SidenavComponent } from './Core/components/sidenav/sidenav.component';
import { DashboardTitleComponent } from './Shared/components/dashboard-title/dashboard-title.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
// import { AuthService } from './Features/Authentication/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidenavComponent,
    AsyncPipe,
    DashboardTitleComponent,
    // LoginPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private homeService = inject(HomeService);
  // private authService = inject(AuthService);

  // isLoggedIn = this.authService.isLoggedIn();

  // // ngOnInit() {
  // //   console.log(this.authService.isLoggedIn());
  // // }

  isVisible$: Observable<boolean> = this.homeService.visible$;

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}

/*
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { HomeService } from './Features/home/services/home.service';
import { AsyncPipe } from '@angular/common';
import { SidenavComponent } from './Core/components/sidenav/sidenav.component';
import { DashboardTitleComponent } from './Shared/components/dashboard-title/dashboard-title.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
// import { AuthService } from './Features/Authentication/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidenavComponent,
    AsyncPipe,
    DashboardTitleComponent,
    // LoginPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private homeService = inject(HomeService);
  // private authService = inject(AuthService);

  // isLoggedIn = this.authService.isLoggedIn();

  // // ngOnInit() {
  // //   console.log(this.authService.isLoggedIn());
  // // }

  isVisible$: Observable<boolean> = this.homeService.visible$;

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}

*/
