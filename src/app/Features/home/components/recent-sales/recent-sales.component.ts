import { Component, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HomeService } from '../../services/home.service';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';
@Component({
  selector: 'app-recent-sales',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DecimalPipe,
    ChartTitleComponent,
  ],
  templateUrl: './recent-sales.component.html',
  styleUrl: './recent-sales.component.css',
})
export class RecentSalesComponent {
  private homeService = inject(HomeService);

  products = this.homeService.getProductsData();
}
