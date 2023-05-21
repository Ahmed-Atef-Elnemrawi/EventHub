import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, concat, finalize } from 'rxjs';
import { LoadingService, Section } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  section!: string;
  constructor(private loadingService: LoadingService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.url.endsWith(Section.Events)) {
      this.setLoadingState(Section.Artists, false);
      this.setLoadingState(Section.Events, true);
    }

    if (request.url.endsWith(Section.Artists)){
      this.setLoadingState(Section.Events, false);
      this.setLoadingState(Section.Artists, true);
    }

    if (request.url.includes(Section.EventsIAttend))
      this.setLoadingState(Section.EventsIAttend, true);

    if (request.url.includes(Section.WhoImFollow))
      this.setLoadingState(Section.WhoImFollow, true);

    if (request.url.endsWith(Section.User))
      this.setLoadingState(Section.User, true);

    return next.handle(request).pipe(
      finalize(() => {
        this.setLoadingState(this.section, false);
      })
    );
  }

  private setLoadingState(section: string, state: boolean) {
    this.section = section;
    this.loadingService.setLoadingState(section, state);
  }
}
