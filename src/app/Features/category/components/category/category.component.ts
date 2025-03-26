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

  searchValue: string = '';

  // first: number = 0;
  // rows: number = 1;
  // currentPage: number = 1;

  ngOnInit() {
    // const pagination = this.categoryService.getCategoryPagination();
    // this.first = pagination.first;
    // this.rows = pagination.currentRows;
    // this.currentPage = pagination.currentPage;

    this.categoryService.fetchAllCategoriesData({
      enteredSize: `${this.rows}`,
      enteredPage: `1`,
    });
  }

  rows: number = 1;
  onPageChange(event: any) {
    // this.first = event.first;
    // this.currentPage = event.page + 1;
    // this.rows = event.rows;
    // this.categoryService.setCategoryPagination({
    //   currentPage: event.page+1,
    // });
    console.log(event);
    if (this.searchValue === '') {
      this.categoryService.fetchAllCategoriesData({
        enteredSize: `${this.rows}`,
        enteredPage: `${event.page + 1}`,
      });
    } else {
      this.categoryService.searchCategory({
        value: this.searchValue,
        page: event.page + 1,
      });
    }
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
    this.searchValue = event.target.value;
    this.categoryService.searchCategory({
      value: this.searchValue,
      page: '1',
    });
  }
}

/*
@if (pageLoading$ | async) {
<div
  class="text-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
>
  <app-spinner />
</div>
}@else if(!(allCategories$ | async).success) {
<p
  class="text-center sm:text-3xl text-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
>
  Something went wrong please try again later💥💥.
</p>
}@else {
<div
  class="m-4 relative"
  [ngClass]="{
    isEmpty: (allCategories$ | async).data.length === 0
  }"
>
  <div>
    @if ((allCategories$ | async).data.length === 0) {
    <p
      class="sm:mb-12 mb-6 sm:text-3xl text-xl text-textColor dark:text-textColor-dark"
    >
      No Categories Available !!
    </p>
    }@else {
    <div class="flex items-center justify-between mb-3">
      <p
        class="text-2xl font-semibold tracking-wider text-textColor dark:text-textColor-dark"
      >
        All Categories
      </p>
      <div class="relative sm:mr-0 -mr-12">
        <input
          type="text"
          placeholder="Search..."
          (input)="onSearchChange($event)"
          class="pl-10 pr-4 py-2 sm:w-full w-[75%] border dark:border-gray-500 rounded-full text-sm bg-backgroundBody dark:bg-background-dark text-textColor dark:text-textColor-dark"
        />
        <i
          class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        ></i>
      </div>
    </div>
    <hr />
    <div class="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 ml-8 sm:ml-0">
      @for (category of (allCategories$ | async).data; track $index) {
      <div class="flex gap-4">
        <div>
          <app-dashboard-itemcard [cardInfo]="{ title: category.name }">
            <div class="p-4 flex flex-col gap-y-4">
              <img
                class="h-[250px] w-full bg-cover rounded-lg border border-gray-300"
                [src]="category.image.secure_url"
                alt=""
              />
              <div class="flex items-center justify-between">
                <a
                  [routerLink]="['/categories', category.name, 'subcategories']"
                  class="text-lg flex items-center gap-x-2 group"
                  (click)="onGetCategoryId(category.id)"
                >
                  <span>Sub Categories</span>
                  <i
                    class="pi pi-arrow-right duration-150 transform group-hover:translate-x-2"
                  ></i>
                </a>
                <div class="flex gap-x-4 items-center">
                  <a (click)="onEditCategory(category)"
                    ><i
                      class="pi pi-pen-to-square text-gray-700 cursor-pointer"
                    ></i
                  ></a>
                  <a
                    *ngIf="!(loadingMap$ | async)?.[category.id]; else loadingTemplate"
                    (click)="onDeleteCategory(category.id)"
                  >
                    <i class="pi pi-trash text-red-500 cursor-pointer"></i>
                  </a>

                  <ng-template #loadingTemplate>
                    <app-spinner />
                  </ng-template>
                </div>
              </div>
            </div>
          </app-dashboard-itemcard>
        </div>
      </div>
      }
    </div>

    }
  </div>

  <!-- <div>
    @if ((allCategories$ | async).data.length !== 0) {
    <p-paginator
      (onPageChange)="onPageChange($event)"
      [first]="first"
      [rows]="rows"
      [totalRecords]="(allCategories$ | async).pagination.count"
    />
    }
    <div [ngClass]="{ notEmpty: (allCategories$ | async).data.length !== 0 }">
      <app-category-upload />
    </div>
  </div> -->
</div>
}

<div
  class="flex items-center relative"
  [ngClass]="{ notEmpty: (allCategories$ | async)?.data?.length !== 0 }"
>
  @if ((allCategories$ | async)?.data?.length !== 0) {
  <p-paginator
    (onPageChange)="onPageChange($event)"
    [first]="first"
    [rows]="rows"
    [totalRecords]="(allCategories$ | async)?.pagination?.count"
  />
  }
  <app-category-upload />
</div>


*/
