import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-title',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-title.component.html',
  styleUrl: './dashboard-title.component.css',
})
export class DashboardTitleComponent {
  title = input.required<string>();
}
