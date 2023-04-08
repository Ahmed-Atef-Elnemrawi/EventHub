import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store} from '@ngrx/store';
import { TokenDto } from '../user/models';
import { State } from '../state/app.state';


@Injectable({
 providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {
  isAuthenticated!: boolean;
  token!: TokenDto;

  constructor(
    private store: Store<State>,
    ) {}


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')!);
    this.token = JSON.parse(localStorage.getItem("token")!);

    if(this.isAuthenticated){
      request = request.clone({setHeaders:{'Authorization': `Bearer ${this.token.accessToken}`}})
      return next.handle(request);
    }

    return next.handle(request);

  }
}
