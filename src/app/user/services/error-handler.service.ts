import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable()
export class ErrorHandlerService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => errorMessage);
      })
    );
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.status === 404) return this.handleNotFound(error);
    if (error.status === 400) return this.handleBadRequest(error);
    if (error.status === 401) return this.handleUnAuthorized(error);
    return 'Internal Server Error';
  }

  handleUnAuthorized(error: HttpErrorResponse): string {
    if (this.router.url === '/users/login') return 'Invalid Email or Password';
    return error.message;
  }

  handleBadRequest(error: HttpErrorResponse): string {
    if (this.router.url === '/users/signup') {
      let message = '';
      const values: string[][] = Object.values(error.error);

      values.forEach((val) => {
        val.map((m: string) => {
          message += `${m} \n `;
        });
      });
      return message;
    }

    if (this.router.url === '/users/account-recovery')
      return 'Email Address is not associated with an EventHub Account';

    return error.error ? error.error : error.message;
  }

  handleNotFound(error: HttpErrorResponse): string {
    this.router.navigate(['/NotFound']);
    return error.message;
  }
}
