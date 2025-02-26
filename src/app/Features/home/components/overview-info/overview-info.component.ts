import { Component, inject } from '@angular/core';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import { HomeService } from '../../services/home.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview-info',
  standalone: true,
  imports: [DashboardItemcardComponent, RouterLink],
  templateUrl: './overview-info.component.html',
  styleUrl: './overview-info.component.css',
})
export class OverviewInfoComponent {
  private homeService = inject(HomeService);

  overviewInfo = this.homeService.overviewData;
}
