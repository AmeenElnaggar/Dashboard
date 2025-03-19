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
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { SpinnerService } from '../../../../Shared/services/spinner.service';
import { UploadService } from '../../../../Shared/services/upload.service';
import { PaginatorModule } from 'primeng/paginator';
import { SubCategoryService } from '../../../subcategory/service/subcategory.service';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);
  private spinnerService = inject(SpinnerService);
  private uploadService = inject(UploadService);
  private subCategoryService = inject(SubCategoryService);

  allCategories$: Observable<any> = this.categoryService.filterdCategories$;

  pageLoading$: Observable<boolean> = this.spinnerService.pageLoading$;

  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  loadingMap$: Observable<{ [key: string]: boolean }> =
    this.spinnerService.loadingMap$;

  first: number = 0;
  rows: number = 1;
  currentPage: number = 1;

  ngOnInit() {
    const pagination = this.categoryService.getCategoryPagination();
    this.first = pagination.first;
    this.rows = pagination.currentRows;
    this.currentPage = pagination.currentPage;

    this.categoryService.fetchAllCategoriesData({
      enteredSize: `${pagination.currentRows}`,
      enteredPage: `${pagination.currentPage}`,
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.currentPage = event.page + 1;
    this.rows = event.rows;
    this.categoryService.setCategoryPagination({
      currentPage: this.currentPage,
      first: this.first,
      currentRows: this.rows,
    });
    this.categoryService.fetchAllCategoriesData({
      enteredSize: `${this.rows}`,
      enteredPage: `${this.currentPage}`,
    });
  }

  onEditCategory(data: any) {
    this.uploadService.retriveDialogData(data);
  }

  onDeleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }

  onGetCategoryId(id: string) {
    this.subCategoryService.getCategoryId(id);
  }

  onSearchChange(event: any) {
    this.categoryService.searchCategory(event.target.value);
  }
}
