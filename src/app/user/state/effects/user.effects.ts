import { Injectable } from '@angular/core';
import { Actions, act } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  catchError,
  concatMap,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPageService } from '../../services/user-page.service';
import { UserAPIActions } from '../actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  userId!: string;
  constructor(
    private authService: AuthService,
    private userPageService: UserPageService,
    private userService: UserService,
    private actions$: Actions
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.loadUser),
      exhaustMap(() => {
        if (this.authService.isAuthenticated()) {
          let userId = this.authService.getUserId();
          localStorage.setItem('userId', userId);
          return this.authService.loadUser(userId).pipe(
            map((profile) => {
              let userRole = this.authService.getUserRole();
              localStorage.setItem('role', userRole);
              localStorage.setItem('userPageId', profile.userPageId);
              return UserAPIActions.loadUserSuccess({
                profile,
                userId,
                userRole,
              });
            }),
            catchError((error) => of(UserAPIActions.loadUserFailure({ error })))
          );
        }
        return of(
          UserAPIActions.loadUserFailure({ error: "user can't be loaded!" })
        );
      })
    )
  );

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAPIActions.updateUserProfile),
      concatMap((action) =>
        this.authService.updateUser(action.userProfile, action.userId).pipe(
          map(() =>
            UserAPIActions.UpdateUserProfileSuccess({
              userProfile: action.userProfile,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(UserAPIActions.updateUserProfileFailure({ error: err.message }))
          )
        )
      )
    );
  });

  loadUserPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAPIActions.loadUserSuccess),
      exhaustMap((action) => {
        if (action.profile.userPageId)
          return this.userPageService
            .getUserPage(action.profile.userPageId)
            .pipe(
              map((userPage) => {
                localStorage.setItem(
                  'pageType',
                  JSON.stringify(userPage.pageType)
                );
                localStorage.setItem('entityId', userPage.entityId);
                return UserAPIActions.loadUserPageSuccess({ userPage });
              }),
              catchError((error) =>
                of(UserAPIActions.LoadUserPageFailure({ error }))
              )
            );
        else return EMPTY;
      })
    );
  });

  loadEventsIAttend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.loadEventsIAttend),
      mergeMap((action) => {
        this.userId = action.userId;
        return this.userService.getEventsIAttend(action.userId).pipe(
          map((response) =>
            UserAPIActions.loadEventsIAttendSuccess({
              events: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              UserAPIActions.loadEventsIAttendFailure({
                error: err.message,
              })
            )
          )
        );
      })
    )
  );

  loadArtistsIFollow$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(UserAPIActions.loadArtistsIFollow),
        mergeMap((action) =>
          this.userService.getArtistsIFollow(action.userId, action.fields)
        )
      )
      .pipe(
        map((response) =>
          UserAPIActions.loadArtistsIFollowSuccess({
            artists: response,
          })
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            UserAPIActions.loadArtistsIFollowFailure({
              error: err.message,
            })
          )
        )
      )
  );

  loadEventIAttendDates$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(UserAPIActions.loadEventsIAttendDates),
        mergeMap((action) =>
          this.userService.getDistinctEventIAttendDates(action.userId)
        )
      )
      .pipe(
        map((response) =>
          UserAPIActions.loadEventsIAttendDatesSuccess({
            dates: response,
          })
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            UserAPIActions.loadEventsIAttendDatesFailure({
              error: err.message,
            })
          )
        )
      )
  );

  unAttendEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.unAttendEvent),
      concatMap((action) =>
        this.userService
          .unAttendEvent(action.artistId, action.eventId, action.userId)
          .pipe(
            map(() => UserAPIActions.unAttendEventSuccess()),
            catchError((err: HttpErrorResponse) =>
              of(UserAPIActions.unAttendEventFailure({ error: err.message }))
            )
          )
      )
    )
  );

  unFollowArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.unFollowArtist),
      concatMap((action) =>
        this.userService.unFollowArtist(action.artistId, action.userId).pipe(
          map(() => UserAPIActions.unFollowArtistSuccess()),
          catchError((err: HttpErrorResponse) =>
            of(
              UserAPIActions.unFollowArtistFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );

  reloadEventIAttend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.unAttendEventSuccess),
      map((action) => UserAPIActions.loadEventsIAttend({ userId: this.userId }))
    )
  );

  reloadEventIAttendDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.unAttendEventSuccess),
      map((action) =>
        UserAPIActions.loadEventsIAttendDates({ userId: this.userId })
      )
    )
  );

  reloadArtistsIFollow = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAPIActions.unFollowArtistSuccess),
      map(() =>
        UserAPIActions.loadArtistsIFollow({
          userId: this.userId,
          fields: 'FirstName,LastName,JobTitle',
        })
      )
    )
  );
}
