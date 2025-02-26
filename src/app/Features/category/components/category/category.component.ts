import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryService } from '../../service/category.service';
import { CategoryUploadComponent } from '../category-upload/category-upload.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryUploadComponent,
    NgClass,
    DashboardItemcardComponent,
    RouterLink,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);
  private navbarService = inject(NavbarService);

  categories = this.categoryService.categories();
}
