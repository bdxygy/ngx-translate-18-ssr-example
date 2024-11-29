import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SeoService } from './seo.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ng-18-ssr-meta';
  seoService = inject(SeoService);
  http = inject(HttpClient);
  translateService = inject(TranslateService);
  platformId = inject(PLATFORM_ID);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  appRef = inject(ApplicationRef);
  destroyRef = inject(DestroyRef);

  async ngOnInit(): Promise<void> {
    await this.setDefaultLanguage();
    await this.setLanguageObserver();
    this.seoService.setMeta();
  }

  setLanguageObserver() {
    return new Promise((resolve, reject) => {
      const activeRouteSubs = this.activatedRoute.queryParams.subscribe({
        next: (params) => {
          this.translateService.use(params['lang']);
          resolve(true);
        },
        error: () => {
          reject(new Error('something wrong went get translation'));
        },
      });

      if (isPlatformBrowser(this.platformId)) {
        this.destroyRef.onDestroy(() => activeRouteSubs.unsubscribe());
      }
    });
  }

  async setDefaultLanguage() {
    this.translateService.use('id');

    if (isPlatformBrowser(this.platformId)) {
      const localLanguage = localStorage.getItem('lang') ?? 'id';

      return this.router.navigate([''], {
        relativeTo: this.activatedRoute,
        queryParams: { lang: localLanguage },
      });
    }

    return true;
  }
}
