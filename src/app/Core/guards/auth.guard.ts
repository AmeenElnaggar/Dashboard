import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, first, filter } from 'rxjs/operators';
import { AuthService } from '../../Features/Authentication/services/auth.service';
import { Store } from '@ngrx/store';
import {
  authDataSelector,
  authModeSelector,
} from '../../Store/selectors/auth.selector';
import { AuthData } from '../../Features/Authentication/model/authdata.model';

export const authGuard: CanMatchFn = (route, segments) => {
  const store = inject(Store);
  const router = inject(Router);

  const isLoginRoute = segments.some((segment) => segment.path === 'login');
  if (isLoginRoute) {
    return true;
  }

  return store.select(authModeSelector).pipe(
    map((response: string) => {
      console.log(response);
      if (response === 'Logout') {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  );
};

export const loginGuard: CanMatchFn = (route, segement) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(authModeSelector).pipe(
    map((response: string) => {
      if (response === 'Logout') {
        return router.parseUrl('');
      } else {
        return true;
      }
    })
  );
};

// import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { map, first, filter } from 'rxjs/operators';
// import { AuthService } from '../../Features/Authentication/services/auth.service';
// import { Store } from '@ngrx/store';
// import {
//   authDataSelector,
//   authModeSelector,
// } from '../../Store/selectors/auth.selector';
// import { AuthData } from '../../Features/Authentication/model/authdata.model';

// export const authGuard: CanMatchFn = (route, segments) => {
//   const store = inject(Store);
//   const router = inject(Router);

//   const isLoginRoute = segments.some((segment) => segment.path === 'login');
//   if (isLoginRoute) {
//     return true;
//   }

//   return store.select(authModeSelector).pipe(
//     map((response: string) => {
//       if (response === 'Logout') {
//         console.log(response);
//         return true;
//       } else {
//         return router.parseUrl('/login');
//       }
//     })
//   );
// };
