import { Component, inject } from '@angular/core';
import { SubcategoryUploadComponent } from '../subcategory-upload/subcategory-upload.component';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryService } from '../../../category/service/category.service';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [
    SubcategoryUploadComponent,
    RouterLink,
    NgClass,
    DashboardItemcardComponent,
  ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent {
  private categoryService = inject(CategoryService);
  private navbarService = inject(NavbarService);

  categories = this.categoryService.categories();
}
