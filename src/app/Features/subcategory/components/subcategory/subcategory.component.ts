import { Component, inject, input } from '@angular/core';
import { SubcategoryUploadComponent } from '../subcategory-upload/subcategory-upload.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryService } from '../../../category/service/category.service';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import { SubCategoryService } from '../../service/subcategory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [
    SubcategoryUploadComponent,
    RouterLink,
    NgClass,
    DashboardItemcardComponent,
    AsyncPipe,
  ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent {
  private subCategoryService = inject(SubCategoryService);

  route = inject(ActivatedRoute);
  categoryName = this.route.snapshot.paramMap.get('categoryName');

  allSubCategories$: Observable<any> =
    this.subCategoryService.allSubCategories$;

  ngOnInit() {
    this.subCategoryService.fetchAllSubCategoriesData({
      enteredSize: '9999',
      enteredPage: '',
      categoryName: this.categoryName!,
    });
  }
}
