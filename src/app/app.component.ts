import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SidenavComponent } from './Core/components/sidenav/sidenav.component';
import { DashboardTitleComponent } from './Shared/components/dashboard-title/dashboard-title.component';
import { NavbarService } from './Shared/services/navbar.service';
import { AuthService } from './Features/Authentication/services/auth.service';
import { Toast } from 'primeng/toast';

import { AuthData } from './Features/Authentication/model/authdata.model';
import { LoginPageComponent } from './Features/Authentication/page/login-page/login-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidenavComponent,
    AsyncPipe,
    DashboardTitleComponent,
    LoginPageComponent,
    Toast,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private navbarService = inject(NavbarService);
  private authService = inject(AuthService);

  authMode$: Observable<string> = this.authService.authMode$;

  title: string = '';

  constructor() {
    effect(() => (this.title = this.navbarService.navbarTitle()));
  }

  ngOnInit() {
    this.authService.isAuthenticated();
  }

  isVisible$: Observable<boolean> = this.navbarService.visible$;

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
