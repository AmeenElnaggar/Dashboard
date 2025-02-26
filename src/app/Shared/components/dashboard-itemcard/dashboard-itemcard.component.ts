import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-dashboard-itemcard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard-itemcard.component.html',
  styleUrl: './dashboard-itemcard.component.css',
})
export class DashboardItemcardComponent {
  cardInfo = input.required<Card>();
  isInDashboardHome = input<boolean>();
}
