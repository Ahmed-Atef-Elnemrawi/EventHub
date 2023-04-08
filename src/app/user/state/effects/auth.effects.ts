import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap, mergeMap } from 'rxjs';
import { AuthAPIAction, UserAPIActions } from '../actions';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { loginSuccess, logoutSuccess } from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private tokenService: TokenService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.login),
      exhaustMap((action) =>
        this.authService.login(action.user).pipe(
          map((token) => {
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(token));
            //TODO: redirect to home page
            this.router.navigate(['']);
            return AuthAPIAction.loginSuccess({ token });
          }),
          catchError((error) => of(AuthAPIAction.loginFailure({ error })))
        )
      )
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.logout),
      map(() => {
        localStorage.clear();
        this.router.navigateByUrl('/users/login');
        return AuthAPIAction.logoutSuccess();
      }),
      catchError(() => of(AuthAPIAction.logoutFailure()))
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.signup),
      exhaustMap((action) =>
        this.authService.registerUser(action.user).pipe(
          map(() => {
            this.router.navigateByUrl('/users/login');
            return AuthAPIAction.signupSuccess();
          }),
          catchError((error) => of(AuthAPIAction.signupFailure({ error })))
        )
      )
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.forgotPassword),
      exhaustMap((action) =>
        this.authService.forgotPasswordRequest(action.forgotPasswordDto).pipe(
          map(() => AuthAPIAction.forgotPasswordSuccess()),
          catchError((error) =>
            of(AuthAPIAction.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.resetPassword),
      exhaustMap((action) =>
        this.authService.resetPassword(action.resetPasswordDto).pipe(
          map(() => {
            this.router.navigateByUrl('/users/login');
            return AuthAPIAction.forgotPasswordSuccess();
          }),
          catchError((error) =>
            of(AuthAPIAction.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthAPIAction.refreshToken),
      mergeMap((action) =>
        this.tokenService.refreshToken(action.token).pipe(
          map((token) => {
            localStorage.setItem('token', JSON.stringify(token));
            return AuthAPIAction.refreshTokenSuccess({ refreshToken: token });
          }),
          catchError((err: HttpErrorResponse) =>
            of(AuthAPIAction.refreshTokenFailure({ error: err.message }))
          )
        )
      )
    );
  });


  loadUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginSuccess),
    map(() => UserAPIActions.loadUser())
  ))

  resetUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(logoutSuccess),
    map(() =>UserAPIActions.ResetUserProfile()
  )))
}
