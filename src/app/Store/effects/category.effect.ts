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

export class CategoriesEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

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
                  fetchAllCategoriesAction({ page: '', size: '' })
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

  deleteCategoryEffect = createEffect(
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
                this.store.dispatch(
                  fetchAllCategoriesAction({ page: '', size: '' })
                );
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

  editCategoryEffect = createEffect(
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
                this.store.dispatch(
                  fetchAllCategoriesAction({ page: '', size: '' })
                );
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
}

/*
 createCategoryEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryAction),
      tap(() => this.store.dispatch(startLoadingAction())),
      switchMap(({ categoryData }) => {
        console.log(categoryData);
        const formData = new FormData();
        formData.append('name', categoryData.name);
        formData.append('image', categoryData.image);
        console.log(formData);
        return this.httpClient
          .post(
            'https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/create',
            formData
          )
          .pipe(
            map((responseSuccess: any) => {
              this.store.dispatch(stopLoadingAction());
              return getCategoryResponseAction({
                payload: responseSuccess,
              });
            }),
            catchError((responseError: any) => {
              this.store.dispatch(stopLoadingAction());
              return of(getCategoryResponseAction({ payload: responseError }));
            })
          );
      })
    )
  );
*/

/*
  createCategoryEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryAction),
      tap(() => this.store.dispatch(startLoadingAction({}))),
      switchMap(({ categoryData }) =>
        this.httpClient
          .post(
            'https://clothingapp-production-681d.up.railway.app/api/v1/admin/categories/create',
            categoryData,
            { withCredentials: true }
          )
          .pipe(
            mergeMap((responseSuccess: any) => [
              stopLoadingAction({}),
              fetchAllCategoriesAction(),
              switchDialogModeAction(),
              dialogStatusAction({ payload: responseSuccess }),
            ]),
            tap((responseSuccess) => {
              this.spinnerService.showMessages(responseSuccess);
            }),
            catchError((responseError: any) =>
              of(
                stopLoadingAction({}),
                dialogStatusAction({ payload: responseError })
              ).pipe(tap(() => this.spinnerService.showMessages(responseError)))
            )
          )
      )
    )
  );
*/
