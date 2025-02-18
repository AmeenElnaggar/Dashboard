import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chart-title',
  standalone: true,
  imports: [],
  templateUrl: './chart-title.component.html',
  styleUrl: './chart-title.component.css',
})
export class ChartTitleComponent {
  title = input.required<string>();
}
