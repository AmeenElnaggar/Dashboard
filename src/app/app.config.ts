import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './Store/store';
import { AuthenticationEffect } from './Store/effects/auth.effect';
import { ThemeEffect } from './Store/effects/theme.effect';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http';
=======
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UsersEffect } from './Store/effects/users.effect';
import { CategoriesEffect } from './Store/effects/category.effect';
import { loggingInterceptor } from './Core/interceptors/auth.interceptor';
>>>>>>> 490d315 (Add Category Logic)

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, tailwind-utilities, primeng',
          },
        },
      },
    }),
    provideStore(reducers),
    provideEffects([
      AuthenticationEffect,
      ThemeEffect,
      UsersEffect,
      CategoriesEffect,
    ]),
  ],
};
