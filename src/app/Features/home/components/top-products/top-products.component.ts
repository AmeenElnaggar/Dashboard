import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { ChartTitleComponent } from '../../../../Shared/components/chart-title/chart-title.component';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    CommonModule,
    Tag,
    ChartTitleComponent,
  ],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css',
})
export class TopProductsComponent {
  private homeService = inject(HomeService);

  products = this.homeService.getProductsDataaa;
}
