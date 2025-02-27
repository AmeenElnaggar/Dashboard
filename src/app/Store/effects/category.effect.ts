import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCategoryAction,
  getCategoryResponseAction,
} from '../actions/category.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { startLoadingAction, stopLoadingAction } from '../actions/ui.action';
import { StoreInterface } from '../store';

export class CategoriesEffect {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreInterface>);
  private httpClient = inject(HttpClient);

  createCategoryEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCategoryAction),
        tap(() => this.store.dispatch(startLoadingAction())),
        switchMap(({ categoryData }) => {
          console.log(document.cookie);
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
                console.log('Success : ', responseSuccess);
                this.store.dispatch(stopLoadingAction());
                return getCategoryResponseAction({
                  payload: responseSuccess,
                });
              }),
              catchError((responseError: any) => {
                console.log('Failed : ', responseError);

                this.store.dispatch(stopLoadingAction());
                return of(
                  getCategoryResponseAction({ payload: responseError })
                );
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
