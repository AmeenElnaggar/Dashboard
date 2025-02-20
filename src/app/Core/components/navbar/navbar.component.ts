import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DashboardTitleComponent } from '../../../Shared/components/dashboard-title/dashboard-title.component';
import { NavbarService } from '../../../Shared/services/navbar.service';
import { map, Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, AvatarModule, DashboardTitleComponent, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  private navbarService = inject(NavbarService);

  isDarkMode$: Observable<boolean> = this.navbarService.themeMode$;
  navbarTitle: string = '';

  constructor() {
    effect(() => (this.navbarTitle = this.navbarService.navbarTitle()));
  }

  ngOnInit() {
    this.isDarkMode$.subscribe((response: boolean) => {
      if (response) {
        document.documentElement.classList.toggle('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  onChangeVisible() {
    this.navbarService.changeVisible();
  }

  onChangeTheme() {
    this.navbarService.changeTheme();
  }
}
