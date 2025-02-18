import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HomeService } from '../../../Features/home/services/home.service';
import { AvatarModule } from 'primeng/avatar';
import { DashboardTitleComponent } from '../../../Shared/components/dashboard-title/dashboard-title.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, AvatarModule, DashboardTitleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  private homeService = inject(HomeService);

  onChangeVisible() {
    this.homeService.changeVisible();
  }
}
