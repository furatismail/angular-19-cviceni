import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { CustomPreloadingStrategy } from './core/services/custom-preloading-strategy.service';
import { TIME_START_DATE } from './shared/components/time/time.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
    { provide: TIME_START_DATE, useValue: '01.01.2000' },
    provideHttpClient()
  ]
};
