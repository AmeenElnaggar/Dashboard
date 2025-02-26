import { Component, inject } from '@angular/core';
import { CategoryUploadComponent } from '../../components/category-upload/category-upload.component';
import { CategoryService } from '../../service/category.service';
import { NgClass } from '@angular/common';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryComponent } from '../../components/category/category.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    CategoryUploadComponent,
    NgClass,
    DashboardItemcardComponent,
    RouterLink,
    CategoryComponent,
    RouterOutlet,
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent {
  private categoryService = inject(CategoryService);
  private navbarService = inject(NavbarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  categories = this.categoryService.categories();
  isSubCategoryPage: boolean = false;

  constructor() {
    this.router.events.subscribe(() => {
      this.isSubCategoryPage = this.router.url.includes(
        '/categories/subcategories'
      );
    });
  }

  ngOnInit() {
    this.navbarService.navbarTitle.set('Categories');
  }
}
