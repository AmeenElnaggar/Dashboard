import { Component } from '@angular/core';
import { UsersTableComponent } from '../../components/users-table/users-table.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {}
