import { Component } from '@angular/core';
import { OverviewInfoComponent } from '../../components/overview-info/overview-info.component';
import { VisitorInsightsComponent } from '../../components/visitor-insights/visitor-insights.component';
import { TotalRevenueComponent } from '../../components/total-revenue/total-revenue.component';
import { CustomerSatisfactionComponent } from '../../components/customer-satisfaction/customer-satisfaction.component';
import { CategorySalesComponent } from '../../components/category-sales/category-sales.component';
import { RecentSalesComponent } from '../../components/recent-sales/recent-sales.component';
import { TopProductsComponent } from '../../components/top-products/top-products.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [
    OverviewInfoComponent,
    VisitorInsightsComponent,
    TotalRevenueComponent,
    CustomerSatisfactionComponent,
    CategorySalesComponent,
    RecentSalesComponent,
    TopProductsComponent,
  ],
})
export class HomePageComponent {}
