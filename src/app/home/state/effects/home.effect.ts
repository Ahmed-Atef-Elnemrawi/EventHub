import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services/Home.service';
import { HomeAPIActions } from '../actions';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/user/services/auth.service';
import { error } from 'jquery';

@Injectable()
export class HomeEffect {
  artistPageSize!: number;
  eventPageSize!: number;

  constructor(private actions$: Actions, private service: HomeService) {}

  loadNewestArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeAPIActions.loadLatestArtists),
      switchMap((action) => {
        this.artistPageSize = action.pageSize;
        return this.service.getNewestArtists(action.pageSize).pipe(
          map((response) =>
            HomeAPIActions.loadLatestArtistsSuccess({
              artists: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              HomeAPIActions.loadLatestArtistsFailure({
                error: err.message,
              })
            )
          )
        );
      })
    )
  );

  loadNewestEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeAPIActions.loadLatestEvents),
      switchMap((action) => {
        this.eventPageSize = action.pageSize!;
        return this.service.getNewestEvents(action.pageSize).pipe(
          map((response) =>
            HomeAPIActions.loadLatestEventsSuccess({
              events: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              HomeAPIActions.loadLatestEventsFailure({
                error: err.message,
              })
            )
          )
        );
      })
    )
  );

  loadMoreArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeAPIActions.loadMoreArtists),
      map((action) => {
        this.artistPageSize = this.artistPageSize + action.incrementBy;
        console.log(this.artistPageSize);
        return HomeAPIActions.loadLatestArtists({
          pageSize: this.artistPageSize,
        });
      })
    )
  );

  loadMoreEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeAPIActions.loadMoreEvents),
      map((action) => {
        this.eventPageSize = this.eventPageSize + action.incrementBy;
        return HomeAPIActions.loadLatestEvents({
          pageSize: this.eventPageSize,
        });
      })
    )
  );

  loadCurrentDayEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeAPIActions.loadCurrentDayEvent),
      switchMap((action) => {
        return this.service.getCurrentDayEvents(action.userId).pipe(
          map((response) =>
            HomeAPIActions.loadCurrentDayEventSuccess({
              currentDayEvents: response,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              HomeAPIActions.loadCurrentDayEventFailure({
                error: err.message,
              })
            )
          )
        );
      })
    )
  );


}
