import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1️⃣ Provide routing
    provideRouter(routes),

    // 2️⃣ Provide HTTP client — no interceptors yet
    provideHttpClient(),
  ],
};
