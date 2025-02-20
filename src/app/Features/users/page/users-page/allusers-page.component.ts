import { Component, inject } from '@angular/core';
import { AllUsersTableComponent } from '../../components/users-table/allusers-table.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';

@Component({
  selector: 'app-allusers-page',
  standalone: true,
  imports: [AllUsersTableComponent],
  templateUrl: './allusers-page.component.html',
  styleUrl: './allusers-page.component.css',
})
export class AllUsersPageComponent {
  private navbarService = inject(NavbarService);

  ngOnInit() {
    this.navbarService.changeNavbarTitle('All Users');
  }
}
