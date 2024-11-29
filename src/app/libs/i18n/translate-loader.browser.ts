import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root',
})
export class BrowserTranslsateLoader extends TranslateHttpLoader {
  constructor() {
    super(inject(HttpClient), '/assets/i18n/', '.json');
  }
}
