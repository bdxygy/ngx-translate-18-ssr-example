import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import idJson from '../../../assets/i18n/id.json';
import enJson from '../../../assets/i18n/en.json';

export class TranslateLoaderServer extends TranslateLoader {
  override getTranslation(lang: string): Observable<TranslationObject> {
    return new Observable((observer) => {
      if (lang === 'id') {
        observer.next(idJson);
      } else {
        observer.next(enJson);
      }
    });
  }
}
