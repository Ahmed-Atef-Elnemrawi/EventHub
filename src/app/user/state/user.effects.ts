import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../state/actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.user).pipe(
          map((authResponse) => {
            localStorage.setItem('token', authResponse.tokenDto.accessToken);
            this.router.navigateByUrl(
              `/users/${authResponse.userProfile.userName}`
            );
            return AuthActions.loginSuccess({ authResponse });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        localStorage.removeItem('token');
        return AuthActions.logoutSuccess();
      }),
      tap(() => this.router.navigateByUrl('/users/login')),
      catchError((error) => of(AuthActions.logoutFailure()))
    );
  });
}
