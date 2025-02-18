import { Component, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';
import { HomeService } from '../../../home/services/home.service';
import { ToastModule } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    ChartTitleComponent,
    IconField,
    InputIcon,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  private homeService = inject(HomeService);
  selectedUser: any;

  users = this.homeService.usersData;

  onFilterGlobal(event: Event, dt2: any) {
    const input = event.target as HTMLInputElement;
    if (input) {
      dt2.filterGlobal(input.value, 'contains');
    }
  }
}
