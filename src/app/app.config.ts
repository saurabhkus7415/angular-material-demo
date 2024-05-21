import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import {
  VERSION as MAT_VERSION,
  MatNativeDateModule,
} from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
  ],
};
