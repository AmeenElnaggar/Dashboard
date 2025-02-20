import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';

@Component({
  selector: 'app-category-sales',
  standalone: true,
  imports: [ChartModule, ChartTitleComponent],
  templateUrl: './category-sales.component.html',
  styleUrl: './category-sales.component.css',
})
export class CategorySalesComponent {
  chartData = {
    labels: ['Electronics', 'Fashion', 'Household'],
    datasets: [{ data: [540, 325, 702] }],
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
