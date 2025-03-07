import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryService } from '../../service/category.service';
import { CategoryUploadComponent } from '../category-upload/category-upload.component';
import { filter, map, Observable } from 'rxjs';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { SpinnerService } from '../../../../Shared/services/spinner.service';
import { UploadService } from '../../../../Shared/services/upload.service';
import { PaginatorModule } from 'primeng/paginator';
import { SubCategoryService } from '../../../subcategory/service/subcategory.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryUploadComponent,
    NgClass,
    DashboardItemcardComponent,
    RouterLink,
    AsyncPipe,
    SpinnerComponent,
    NgIf,
    PaginatorModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);
  private spinnerService = inject(SpinnerService);
  private uploadService = inject(UploadService);
  private subCategoryService = inject(SubCategoryService);

  allCategories$: Observable<any> = this.categoryService.allCategories$;

  pageLoading$: Observable<boolean> = this.spinnerService.pageLoading$;

  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  loadingMap$: Observable<{ [key: string]: boolean }> =
    this.spinnerService.loadingMap$;

  first: number = 0;
  rows: number = 1;
  page: number = 1;

  ngOnInit() {
    const pagination = this.categoryService.getCategoryPagination();

    if (pagination) {
      this.first = pagination.currentRow;
      this.rows = pagination.currentRows;
      this.page = pagination.currentPage;
    }

    this.categoryService.fetchAllCategoriesData({
      enteredSize: `${this.rows}`,
      enteredPage: `${this.page}`,
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.page = event.page + 1;
    this.rows = event.rows;

    this.categoryService.setCategoryPagination({
      currentRow: this.first,
      currentRows: this.rows,
      currentPage: this.page,
    });

    this.categoryService.fetchAllCategoriesData({
      enteredSize: `${this.rows}`,
      enteredPage: `${this.page}`,
    });
  }
  onDeleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }

  onEditCategory(data: any) {
    this.uploadService.retriveDialogData(data);
  }

  onGetCategoryId(id: string) {
    this.subCategoryService.getCategoryId(id);
  }
}
