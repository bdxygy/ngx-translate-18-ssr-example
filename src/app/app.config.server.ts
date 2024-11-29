import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderServer } from './libs/i18n/translate-loader.server';
import { provideBasePath } from './utils/basepath.util';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideTranslateService({
      loader: { provide: TranslateLoader, useClass: TranslateLoaderServer },
    }),
    provideBasePath(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
