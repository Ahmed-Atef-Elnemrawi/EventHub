import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { EventService } from '../../services/artist-event.service';
import {ArtistEventAPIActions } from '../actions';
import { UserAPIActions } from 'src/app/user/state/actions';
import { Router } from '@angular/router';

@Injectable()
export class ArtistEventEffect {
  attendantId!: string;

  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private router: Router
  ) {}



    loadArtistEventAttendants$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistEventAPIActions.loadArtistEventAttendants),
        mergeMap((action) =>
          this.eventService.getEventAttendants(
            action.artistId,
            action.eventId
          )
        )
      )
      .pipe(
        map((response) =>
          ArtistEventAPIActions.loadArtistEventAttendantsSuccess({
            attendants: response.body,
          })
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistEventAPIActions.loadArtistEventAttendantsFailure({
              error: err.message,
            })
          )
        )
      );
  });

  createArtistEventAttendant$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistEventAPIActions.createArtistEventAttendant),
        concatMap((action) =>{

          this.router.navigateByUrl(`users/${this.attendantId}/events-I-attend`)
          return this.eventService.createEventAttendant(
            action.artistId,
            action.eventId,
            action.attendant
          )
        }
        )
      )
      .pipe(
        map(() =>
          ArtistEventAPIActions.createArtistEventAttendantSuccess()
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistEventAPIActions.createArtistEventAttendantFailure({
              error: err.message,
            })
          )
        )
      );
  });

  deleteArtistEventAttendant$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistEventAPIActions.DeleteArtistEventAttendant),
        concatMap((action) => {
          this.attendantId = action.attendantId;

          return this.eventService.removeEventAttendant(
            action.artistId,
            action.eventId,
            action.attendantId
          );
        })
      )
      .pipe(
        map(() =>
          ArtistEventAPIActions.DeleteArtistEventAttendantSuccess()
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistEventAPIActions.DeleteArtistEventAttendantFailure({
              error: err.message,
            })
          )
        )
      );
  });

//for searching
  // loadAllArtistsEvents$ = createEffect(() =>
  //   this.actions$
  //     .pipe(
  //       ofType(ArtistAPIActions.loadArtistsEvents),
  //       mergeMap((action) => this.eventService.getAllEvents(action.searchTerm))
  //     )
  //     .pipe(
  //       map((response) =>
  //         ArtistAPIActions.loadArtistsEventsSuccess({
  //           events: response,
  //         })
  //       ),
  //       catchError((err: HttpErrorResponse) =>
  //         of(
  //           ArtistAPIActions.loadArtistsEventsFailure({
  //             error: err.message,
  //           })
  //         )
  //       )
  //     )
  // );


}
