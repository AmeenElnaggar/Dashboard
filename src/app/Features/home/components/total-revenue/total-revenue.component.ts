import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';

@Component({
  selector: 'app-total-revenue',
  standalone: true,
  imports: [ChartModule, ChartTitleComponent],
  templateUrl: './total-revenue.component.html',
  styleUrl: './total-revenue.component.css',
})
export class TotalRevenueComponent {
  chartData = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Online Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        data: [10, 25, 35, 15, 30, 40, 50],
      },
      {
        label: 'Offline Sales',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        data: [5, 15, 20, 10, 25, 35, 45],
      },
    ],
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };
}
