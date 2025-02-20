import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';

@Component({
  selector: 'app-customer-satisfaction',
  standalone: true,
  imports: [ChartModule, ChartTitleComponent],
  templateUrl: './customer-satisfaction.component.html',
  styleUrl: './customer-satisfaction.component.css',
})
export class CustomerSatisfactionComponent {
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
        label: 'Reality Sales',
        backgroundColor: '#ffcf01',
        data: [10, 25, 35, 15, 30, 40, 45],
      },
      {
        label: 'Target Sales',
        backgroundColor: '#4bb58d',
        data: [15, 35, 40, 30, 50, 50, 50],
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
          color: '#9B9A96',
          usePointStyle: true,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };
}
