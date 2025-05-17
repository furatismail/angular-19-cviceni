import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { CustomPreloadingStrategy } from './core/services/custom-preloading-strategy.service';
import { TIME_START_DATE } from './shared/components/time/time.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
    { provide: TIME_START_DATE, useValue: '01.01.2000' },
    provideHttpClient(withInterceptors([authInterceptor]) // 🔌 registrace interceptoru
    ),
  ]
};
