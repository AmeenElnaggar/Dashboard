import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchAllCategoriesAction,
  getAllCategoriesResponseAction,
  getEditedCategoryResponseAction,
} from '../actions/category.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';
import { StoreInterface } from '../store';
import { switchDialogModeAction } from '../actions/dialog.action';
import { SpinnerService } from '../../Shared/services/spinner.service';

export class SubCategoriesEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

  getSubCategoriesDataEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCategoriesAction),
      tap(() => this.store.dispatch(startLoadingAction({ id: 'c' }))),

      switchMap(() => {
        return this.httpClient
          .get(
            'https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/read_all?size=12'
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

  createSubCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCategoryAction),
        tap(() => this.store.dispatch(startLoadingAction({}))),
        switchMap(({ categoryData }) => {
          return this.httpClient
            .post(
              'https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/create',
              categoryData,
              {
                withCredentials: true,
              }
            )
            .pipe(
              map((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({}));
                this.store.dispatch(
                  fetchAllCategoriesAction({ page: '1', size: '1' })
                );
                this.store.dispatch(
                  switchDialogModeAction({ visible: false, isEditing: false })
                );
                this.spinnerService.showMessages(responseSuccess);
              }),
              catchError((responseError: any) => {
                this.spinnerService.showMessages(responseError);
                this.store.dispatch(stopLoadingAction({}));
                return '';
              })
            );
        })
      ),
    { dispatch: false }
  );

  /*


  deleteSubCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCategoryAction),
        tap(({ categoryId }) =>
          this.store.dispatch(startLoadingAction({ id: categoryId }))
        ),
        switchMap(({ categoryId }) => {
          return this.httpClient
            .delete(
              `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/delete_one/${categoryId}`,
              {
                withCredentials: true,
              }
            )
            .pipe(
              map((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({ id: categoryId }));
                this.store.dispatch(fetchAllCategoriesAction());
                this.spinnerService.showMessages(responseSuccess);
              }),
              catchError((responseError: any) => {
                this.store.dispatch(stopLoadingAction({ id: categoryId }));
                this.spinnerService.showMessages(responseError);
                return '';
              })
            );
        })
      ),
    { dispatch: false }
  );

  editSubCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editCategoryAction),
        tap(() => this.store.dispatch(startLoadingAction({}))),

        switchMap(({ categoryData, id }) => {
          console.log(id);
          return this.httpClient
            .patch(
              `https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/update_one/${id}`,
              categoryData,
              {
                withCredentials: true,
              }
            )
            .pipe(
              map((responseSuccess: any) => {
                this.store.dispatch(stopLoadingAction({}));
                this.spinnerService.showMessages(responseSuccess);
                this.store.dispatch(
                  switchDialogModeAction({ visible: false, isEditing: false })
                );
                this.store.dispatch(fetchAllCategoriesAction());
              }),
              catchError((responseError: any) => {
                this.store.dispatch(stopLoadingAction({}));

                this.spinnerService.showMessages(responseError);

                return '';
              })
            );
        })
      ),
    { dispatch: false }
  );
  */
}
