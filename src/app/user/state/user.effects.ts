import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { UserApiActions } from '../state/actions';
import { AuthService } from '../auth.service';
import { catchError, concatMap, debounceTime, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.login),
      exhaustMap((action) =>
        this.authService.login(action.user).pipe(
          map((token) => {
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(token));

            //TODO: redirect to home page
            this.router.navigateByUrl(``);
            return UserApiActions.loginSuccess({ token });
          }),
          catchError((error) => of(UserApiActions.loginFailure({ error })))
        )
      )
    );
  });

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserApiActions.loadUser),
      exhaustMap(() => {
        if (this.authService.isAuthenticated()) {
          let userId = this.authService.getUserId();

          return this.authService.loadUser(userId).pipe(
            map((profile) => {
              this.router.navigateByUrl(
                `users/${profile.userName}/event-i-attends`
              );
              return UserApiActions.loadUserSuccess({ profile, userId });
            }),
            catchError((error) => of(UserApiActions.loadUserFailure({ error })))
          );
        }
        return of(
          UserApiActions.loadUserFailure({ error: "can't load the user!" })
        );
      })
    )
  );

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.logout),
      map(() => {
        localStorage.removeItem('token');
        return UserApiActions.logoutSuccess();
      }),
      tap(() => this.router.navigateByUrl('/users/login')),
      catchError(() => of(UserApiActions.logoutFailure()))
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.signup),
      exhaustMap((action) =>
        this.authService.registerUser(action.user).pipe(
          map(() => {
            this.router.navigateByUrl("users/login")
            return UserApiActions.signupSuccess();
          }),
          catchError((error) => of(UserApiActions.signupFailure({ error })))
        )
      )
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.forgotPassword),
      exhaustMap((action) =>
        this.authService.forgotPasswordRequest(action.forgotPasswordDto).pipe(
          map(() => UserApiActions.forgotPasswordSuccess()),
          catchError((error) =>
            of(UserApiActions.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.resetPassword),
      exhaustMap((action) =>
        this.authService.resetPassword(action.resetPasswordDto).pipe(
          map(() => {
            this.router.navigateByUrl('/users/login');
            return UserApiActions.forgotPasswordSuccess();
          }),
          catchError((error) =>
            of(UserApiActions.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserApiActions.updateUserProfile),
      concatMap((action) =>
        this.authService.updateUser(action.userProfile, action.userId).pipe(
          map(() =>
            UserApiActions.UpdateUserProfileSuccess({
              userProfile: action.userProfile,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(UserApiActions.updateUserProfileFailure({ error: err.message }))
          )
        )
      )
    );
  });
}
