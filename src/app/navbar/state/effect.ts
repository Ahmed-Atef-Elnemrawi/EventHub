import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NavbarActions from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAPIActions } from 'src/app/user/state/actions';

@Injectable({
  providedIn: 'root',
})
export class NavbarEffect {
  constructor(private action$: Actions, private service: NavbarService) {}

  loadEventsBySearchTerm$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavbarActions.loadEventsBySearchTerm),
      switchMap((action) =>
        this.service.loadEventsBySearchTerm(action.searchTerm).pipe(
          map((response) =>
            NavbarActions.loadEventsBySearchTermSuccess({
              searchedEvents: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              NavbarActions.loadEventsBySearchTermFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );

  loadArtistsBySearchTerm$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavbarActions.loadArtistBySearchTerm),
      switchMap((action) =>
        this.service.loadArtistsBySearchTerm(action.searchTerm).pipe(
          map((response) =>
            NavbarActions.loadArtistBySearchTermSuccess({
              searchedArtists: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              NavbarActions.loadArtistBySearchTermFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );

 loadNotificationsCountWhenUserLoaded$ = createEffect(() =>
  this.action$.pipe(
    ofType(UserAPIActions.loadUserSuccess),
    map((action) => NavbarActions.loadNotificationsCount({
      userId: action.userId
    }))
  ))

  loadNotificationsCount$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavbarActions.loadNotificationsCount),
      switchMap(action => this.service.loadNotificationCount(action.userId).pipe(
        map(response => NavbarActions.loadNotificationsCountSuccess({
          notificationsCount:response.count
        })),
        catchError((err: HttpErrorResponse) => of(NavbarActions.loadNotificationsCountFailure({
          error: err.message
        })))
      ))
    ))
}
