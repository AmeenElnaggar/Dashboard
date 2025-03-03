import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardItemcardComponent } from '../../../../Shared/components/dashboard-itemcard/dashboard-itemcard.component';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { CategoryService } from '../../service/category.service';
import { CategoryUploadComponent } from '../category-upload/category-upload.component';
import { filter, map, Observable } from 'rxjs';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { SpinnerService } from '../../../../Shared/services/spinner.service';
import { UploadService } from '../../../../Shared/services/upload.service';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

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

  allCategories$: Observable<any> = this.categoryService.allCategories$;

  pageLoading$: Observable<boolean> = this.spinnerService.pageLoading$;

  isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
  loadingMap$: Observable<{ [key: string]: boolean }> =
    this.spinnerService.loadingMap$;

  first: number = 0;
  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnInit() {
    this.allCategories$.pipe(filter((res) => res.data)).subscribe((res) => {
      console.log(res);
      this.first = res.pagination.currentPage;
    });
  }

  onDeleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }

  onEditCategory(data: any) {
    this.uploadService.retriveDialogData(data);
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
  class="m-4"
  [ngClass]="{
    isEmpty: (allCategories$ | async).length === 0
  }"
>
  <div>
    @if ((allCategories$ | async).length === 0) {
    <p
      class="sm:mb-12 mb-6 sm:text-3xl text-xl text-textColor dark:text-textColor-dark"
    >
      No Categories Available !!
    </p>
    }@else {
    <div class="flex flex-col sm:flex-row flex-wrap gap-4 ml-8 sm:ml-0">
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
    <div
      class="flex items-center relative"
      [ngClass]="{ notEmpty: (allCategories$ | async).length !== 0 }"
    >
      @if ((allCategories$ | async).length !== 0) {
      <p-paginator
        [first]="first"
        [totalRecords]="120"
        [rowsPerPageOptions]="[10, 20, 30]"
      />
      }
      <app-category-upload />
    </div>
  </div>
</div>
}

*/
