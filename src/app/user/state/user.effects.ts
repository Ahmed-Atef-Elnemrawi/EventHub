import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../state/actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { createAction } from '@ngrx/store';

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

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) =>
        this.authService.registerUser(action.user).pipe(
          map(() => AuthActions.signupSuccess()),
          catchError((error) => of(AuthActions.signupFailure({ error })))
        )
      )
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap((action) =>
        this.authService.forgotPasswordRequest(action.forgotPasswordDto).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) =>
            of(AuthActions.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap((action) =>
        this.authService.resetPassword(action.resetPasswordDto).pipe(
          map(() => {
            this.router.navigateByUrl('/users/login');
            return AuthActions.forgotPasswordSuccess();
          }),
          catchError((error) =>
            of(AuthActions.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });
}
