import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApplicationRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  router = inject(Router);
  appRef = inject(ApplicationRef);
  platformId = inject(PLATFORM_ID);
  http = inject(HttpClient);
  titleService = inject(Title);
  metaService = inject(Meta);

  setMeta() {
    if (this.appRef.isStable) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          switchMap(() => this.http.get('https://dummyjson.com/posts/1'))
        )
        .subscribe({
          next: (response: any) => {
            this.titleService.setTitle(response.title);
            this.metaService.updateTag({
              name: 'description',
              content: response.body,
            });
          },
        });
    }
  }
}
