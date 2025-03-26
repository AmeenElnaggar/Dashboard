import { DestroyRef, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchAllCategoriesAction,
  getAllCategoriesResponseAction,
  getEditedCategoryResponseAction,
  getSearchCategoryResponseAction,
  searchCategoryAction,
} from '../actions/category.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';
import { StoreInterface } from '../store';
import { switchDialogModeAction } from '../actions/dialog.action';
import { SpinnerService } from '../../Shared/services/spinner.service';
import { CategoryService } from '../../Features/category/service/category.service';

export class CategoriesEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private spinnerService = inject(SpinnerService);
  private categoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);

  getCategoriesDataEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCategoriesAction),
      tap(() => this.store.dispatch(startLoadingAction({ id: 'c' }))),
      switchMap(({ page, size }) => {
        return this.httpClient
          .get(
            `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/read_all?size=${size}&page=${page}`
          )
          .pipe(
            map((responseSuccess: any) => {
              this.store.dispatch(stopLoadingAction({ id: 'c' }));
              return getAllCategoriesResponseAction({
                payload: responseSuccess,
              });
            }),
            catchError((responseError: any) => {
              this.store.dispatch(stopLoadingAction({ id: 'c' }));
              return of(
                getAllCategoriesResponseAction({
                  payload: responseError,
                })
              );
            })
          );
      })
    )
  );

  createCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCategoryAction),
        tap(() => this.store.dispatch(startLoadingAction({}))),
        switchMap(({ categoryData }) => {
          const pagination = this.categoryService.getCategoryPagination();
          return this.httpClient
            .post(
              'https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/create',
              categoryData,
              {
                withCredentials: true,
              }
            )
            .pipe(
              tap((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({}));

                let currentTotalItems: number = 0;

                const subscribtion =
                  this.categoryService.allCategories$.subscribe((res) => {
                    currentTotalItems = res.pagination.count + 1;
                  });
                this.destroyRef.onDestroy(() => subscribtion.unsubscribe());

                let totalPages = Math.ceil(
                  currentTotalItems / pagination.currentRows
                );
                this.store.dispatch(
                  fetchAllCategoriesAction({
                    page: pagination.currentPage,
                    size: pagination.currentRows,
                  })
                );
                this.store.dispatch(
                  switchDialogModeAction({ visible: false, isEditing: false })
                );
                this.spinnerService.showMessages(responseSuccess);
              }),
              catchError((responseError: any) => {
                this.spinnerService.showMessages(responseError);
                this.store.dispatch(stopLoadingAction({}));
                return of();
              })
            );
        })
      ),
    { dispatch: false }
  );

  deleteCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCategoryAction),
        tap(({ categoryId }) =>
          this.store.dispatch(startLoadingAction({ id: categoryId }))
        ),
        switchMap(({ categoryId }) => {
          const pagination = this.categoryService.getCategoryPagination();
          return this.httpClient
            .patch(
              `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/delete_one/${categoryId}`,
              { isDeleted: true },
              {
                withCredentials: true,
              }
            )
            .pipe(
              tap((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({ id: categoryId }));

                let currentTotalItems: number = 0;
                const subscribtion =
                  this.categoryService.allCategories$.subscribe((res) => {
                    console.log(res);
                    currentTotalItems = res.pagination.count - 1;
                  });
                this.destroyRef.onDestroy(() => subscribtion.unsubscribe());

                const totalPages = Math.ceil(
                  currentTotalItems / pagination.currentRows
                );
                let newPage = pagination.currentPage;
                if (pagination.currentPage > totalPages) {
                  newPage = Math.max(totalPages, 1);
                }

                this.store.dispatch(
                  fetchAllCategoriesAction({
                    page: newPage,
                    size: pagination.currentRows,
                  })
                );
                this.spinnerService.showMessages(responseSuccess);
              }),
              catchError((responseError: any) => {
                this.store.dispatch(stopLoadingAction({ id: categoryId }));
                this.spinnerService.showMessages(responseError);
                return of();
              })
            );
        })
      ),
    { dispatch: false }
  );

  editCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editCategoryAction),
        tap(() => this.store.dispatch(startLoadingAction({}))),
        switchMap(({ categoryData, id }) => {
          return this.httpClient
            .patch(
              `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/update_one/${id}`,
              categoryData,
              {
                withCredentials: true,
              }
            )
            .pipe(
              tap((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({}));
                this.spinnerService.showMessages(responseSuccess);
                this.store.dispatch(
                  switchDialogModeAction({ visible: false, isEditing: false })
                );
                const pagination = this.categoryService.getCategoryPagination();
                this.store.dispatch(
                  fetchAllCategoriesAction({
                    page: pagination.currentPage,
                    size: pagination.currentRows,
                  })
                );
              }),
              catchError((responseError: any) => {
                this.store.dispatch(stopLoadingAction({}));
                this.spinnerService.showMessages(responseError);
                return of();
              })
            );
        })
      ),
    { dispatch: false }
  );

  searchCategoryEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCategoryAction),
      tap(() => this.store.dispatch(startLoadingAction({ id: 'c' }))),

      switchMap(({ searchKey, currentPage }) => {
        // const pagination = this.categoryService.getCategoryPagination();
        return this.httpClient
          .get(
            `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/read_all?size=1&search=${searchKey}&page=${currentPage}`
          )
          .pipe(
            map((responseSuccess: any) => {
              console.log(responseSuccess);
              this.store.dispatch(stopLoadingAction({ id: 'c' }));

              return getSearchCategoryResponseAction({
                payload: responseSuccess,
              });
            }),
            catchError((responseError: any) => {
              this.store.dispatch(stopLoadingAction({ id: 'c' }));

              return of(
                getSearchCategoryResponseAction({
                  payload: responseError,
                })
              );
            })
          );
      })
    )
  );
}
