import { Component, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { UsersService } from '../../services/users.service';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-allusers-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    IconField,
    InputIcon,
    NgIf,
  ],
  templateUrl: './allusers-table.component.html',
  styleUrl: './allusers-table.component.css',
})
export class AllUsersTableComponent {
  private usersService = inject(UsersService);
  private navbarService = inject(NavbarService);

  isDarkMode$: Observable<boolean> = this.navbarService.themeMode$;
  selectedUser: any;

  users = this.usersService.usersData;

  onFilterGlobal(event: Event, dt2: any) {
    const input = event.target as HTMLInputElement;
    if (input) {
      dt2.filterGlobal(input.value, 'contains');
    }
  }
}
