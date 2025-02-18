import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Card } from '../../models/cart.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-itemcard',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './dashboard-itemcard.component.html',
  styleUrl: './dashboard-itemcard.component.css',
})
export class DashboardItemcardComponent {
  cardInfo = input.required<Card>();
}
