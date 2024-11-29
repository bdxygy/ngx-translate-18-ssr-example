import { APP_BASE_HREF } from '@angular/common';
import { makeEnvironmentProviders } from '@angular/core';

export const provideBasePath = () =>
  makeEnvironmentProviders([
    {
      provide: APP_BASE_HREF,
      useValue: '/ng-18-ssr-meta/',
    },
  ]);
