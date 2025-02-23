import { Component, inject, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-visitor-insights',
  standalone: true,
  imports: [ChartModule, ChartTitleComponent],
  templateUrl: './visitor-insights.component.html',
  styleUrl: './visitor-insights.component.css',
})
export class VisitorInsightsComponent {
  chartData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Loyal Customers',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 1)',

        data: [10, 25, 35, 15, 30, 40, 50, 45, 55, 60, 70, 80],
        fill: false,
        tension: 0.4,
      },
      {
        label: 'New Customers',
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: [5, 15, 20, 10, 25, 35, 45, 50, 60, 65, 75, 85],
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Unique Customers',
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        data: [2, 10, 15, 8, 18, 25, 30, 35, 40, 50, 60, 70],
        fill: false,
        tension: 0.4,
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
      x: {
        ticks: {
          color: '#9B9A96',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        ticks: {
          color: '#9B9A96',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };
}
