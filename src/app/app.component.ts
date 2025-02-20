import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { HomeService } from './Features/home/services/home.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { SidenavComponent } from './Core/components/sidenav/sidenav.component';
import { DashboardTitleComponent } from './Shared/components/dashboard-title/dashboard-title.component';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';
import { NavbarService } from './Shared/services/navbar.service';
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
    NgClass,
    // LoginPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private navbarService = inject(NavbarService);
  // private authService = inject(AuthService);

  // isLoggedIn = this.authService.isLoggedIn();

  // // ngOnInit() {
  // //   console.log(this.authService.isLoggedIn());
  // // }

  title: string = '';

  constructor() {
    effect(() => (this.title = this.navbarService.navbarTitle()));
  }

  isVisible$: Observable<boolean> = this.navbarService.visible$;

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
