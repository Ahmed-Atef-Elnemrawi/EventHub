import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { ArtistAPIActions } from '../actions';

@Injectable()
export class ArtistEffects {
  private artistId!: string;
  private userId: string = localStorage.getItem('userId')!;

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private actions$: Actions
  ) {}

  loadArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.loadArtist),
      mergeMap((action) =>
        this.artistService.getArtist(action.id).pipe(
          map((response) => {
            this.artistId = response.id;
            return ArtistAPIActions.loadArtistSuccess({
              artist: response.entity,
              artistId: response.id,
            });
          }),
          catchError((error) =>
            of(ArtistAPIActions.loadArtistFailure({ error }))
          )
        )
      )
    );
  });

  createArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.createArtist),
      mergeMap((action) =>
        this.artistService.createArtist(action.artist).pipe(
          map((response) => {
            localStorage.setItem('artistId', response.producerId);
            return ArtistAPIActions.createArtistSuccess({ artist: response });
          }),
          catchError((error) =>
            of(ArtistAPIActions.createArtistFailure({ error }))
          )
        )
      )
    );
  });

  updateArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.updateArtist),
      mergeMap((action) =>
        this.artistService.updateArtist(action.artistId, action.artist).pipe(
          map(() => {
            return ArtistAPIActions.updateArtistSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(ArtistAPIActions.createArtistFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.deleteArtist),
      mergeMap((action) =>
        this.artistService.deleteArtist(action.id).pipe(
          map(() => ArtistAPIActions.deleteArtistSuccess()),
          catchError((error) =>
            of(ArtistAPIActions.deleteArtistFailure({ error }))
          )
        )
      )
    );
  });

  loadAllArtistFollowers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.loadArtistFollowers),
      mergeMap((action) =>
        this.artistService.getArtistFollowers(action.artistId).pipe(
          map((followers) =>
            ArtistAPIActions.loadArtistFollowersSuccess({
              followers: followers.body,
            })
          )
        )
      ),
      catchError((err: HttpErrorResponse) =>
        of(
          ArtistAPIActions.loadArtistFollowersFailure({
            error: err.message,
          })
        )
      )
    );
  });

  createArtistFollower$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistAPIActions.createArtistFollower),
        mergeMap((action) =>
          this.artistService.createArtistFollower(
            action.artistId,
            action.follower
          )
        )
      )
      .pipe(
        map((follower) =>
          ArtistAPIActions.createArtistFollowerSuccess({ follower })
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistAPIActions.createArtistFollowerFailure({
              error: err.message,
            })
          )
        )
      );
  });

  deleteArtistFollower$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistAPIActions.DeleteArtistFollower),
        mergeMap((action) => {
          this.userId = action.followerId;
          return this.artistService.removeArtistFollower(
            action.artistId,
            action.followerId
          );
        })
      )
      .pipe(
        map(() => ArtistAPIActions.DeleteArtistFollowerSuccess()),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistAPIActions.DeleteArtistFollowerFailure({
              error: err.message,
            })
          )
        )
      );
  });

  loadIsUserFollowingArtist$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistAPIActions.loadIsUserFollowingArtist),
        mergeMap((action) =>
          this.artistService.isUserFollowingArtist(
            action.userId,
            action.artistId
          )
        )
      )
      .pipe(
        map((value) =>
          ArtistAPIActions.loadIsUserFollowingArtistSuccess({
            result: value.result,
          })
        ),
        catchError((err: HttpErrorResponse) =>
          of(
            ArtistAPIActions.loadIsUserFollowingArtistFailure({
              error: err.message,
            })
          )
        )
      );
  });

  reloadUserFollowingArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.DeleteArtistFollowerSuccess),
      map(() =>
        ArtistAPIActions.loadFollowedArtistsForUser({
          followerId: this.userId,
          fields: 'FirstName,LastName,JobTitle',
        })
      )
    );
  });

  loadArtistFollowersCount$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ArtistAPIActions.loadArtistFollowersCount),
        mergeMap((action) =>
          this.artistService.getArtistFollowersCount(action.artistId)
        )
      )
      .pipe(
        map((response) =>
          ArtistAPIActions.loadArtistFollowersCountSuccess({
            followersCount: response.followersCount,
          })
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            ArtistAPIActions.loadArtistFollowersCountFailure({
              error: error.message,
            })
          )
        )
      );
  });

  loadArtistEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistAPIActions.loadArtistEvent),
      mergeMap((action) =>
        this.artistService.getArtistEvent(action.artistId, action.eventId).pipe(
          map((response) =>
            ArtistAPIActions.loadArtistEventSuccess({
              event: response.entity,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(ArtistAPIActions.loadArtistEventFailure({ error: err.message }))
          )
        )
      )
    )
  );

  createArtistEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistAPIActions.createArtistEvent),
      mergeMap((action) =>
        this.artistService
          .createArtistEvent(action.artistId, action.event)
          .pipe(
            map((response) =>
              ArtistAPIActions.createArtistEventSuccess({ event: response })
            ),
            catchError((err: HttpErrorResponse) =>
              of(
                ArtistAPIActions.CreateArtistEventFailure({
                  error: err.message,
                })
              )
            )
          )
      )
    )
  );

  updateArtistEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistAPIActions.updateArtistEvent),
      mergeMap((action) =>
        this.artistService
          .updateArtistEvent(action.artistId, action.eventId, action.event)
          .pipe(
            map(() => {
              this.router.navigateByUrl(`/artists/${action.artistId}`);
              return ArtistAPIActions.updateArtistEventSuccess();
            }),
            catchError((err: HttpErrorResponse) =>
              of(
                ArtistAPIActions.updateArtistEventFailure({
                  error: err.message,
                })
              )
            )
          )
      )
    )
  );

  deleteArtistEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistAPIActions.deleteArtistEvent),
      mergeMap((action) =>
        this.artistService
          .removeArtistEvent(action.artistId, action.eventId)
          .pipe(
            map(() => ArtistAPIActions.deleteArtistEventSuccess()),
            catchError((err: HttpErrorResponse) =>
              of(
                ArtistAPIActions.deleteArtistEventFailure({
                  error: err.message,
                })
              )
            )
          )
      )
    )
  );

  loadAllArtistEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistAPIActions.loadArtistEvents),
      mergeMap((action) =>
        this.artistService
          .getArtistEvents(
            action.artistId,
            action.sortBy,
            action.filterBy,
            action.pageSize,
            action.pageNumber
          )
          .pipe(
            map((response) => {
              return ArtistAPIActions.loadArtistEventsSuccess({
                events: response.body,
                'x-pagination': JSON.parse(
                  response.headers.get('x-pagination')!
                ),
              });
            }),
            catchError((err: HttpErrorResponse) =>
              of(
                ArtistAPIActions.loadArtistEventsFailure({
                  error: err.message,
                })
              )
            )
          )
      )
    )
  );

  reloadArtistEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ArtistAPIActions.createArtistEventSuccess,
        ArtistAPIActions.deleteArtistEventSuccess,
        ArtistAPIActions.updateArtistEventSuccess
      ),
      map(() => {
        let artistPageId = localStorage.getItem('entityId')!;
        this.router.navigateByUrl(`/artists/${artistPageId}`);
        return ArtistAPIActions.loadArtistEvents({
          artistId: artistPageId,
        });
      })
    )
  );

  reloadArtist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistAPIActions.updateArtistSuccess),
      map(() => {
        this.router.navigateByUrl(`/artists/${this.artistId}`);
        return ArtistAPIActions.loadArtist({
          id: this.artistId,
        });
      })
    );
  });

  reloadIsUserFollowingArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ArtistAPIActions.createArtistFollowerSuccess,
        ArtistAPIActions.DeleteArtistFollowerSuccess
      ),
      map(() =>
        ArtistAPIActions.loadIsUserFollowingArtist({
          userId: this.userId,
          artistId: this.artistId,
        })
      )
    )
  );

  reloadArtistFollowersCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ArtistAPIActions.createArtistFollowerSuccess,
        ArtistAPIActions.DeleteArtistFollowerSuccess
      ),
      map(() =>
        ArtistAPIActions.loadArtistFollowersCount({
          artistId: this.artistId,
        })
      )
    )
  );
}

// getAllArtists$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(ArtistAPIActions.loadArtists),
//     mergeMap((action) =>
//       this.artistService.getArtists(action.searchTerm).pipe(
//         map((response) =>
//           ArtistAPIActions.loadArtistsSuccess({ artists: response })
//         ),
//         catchError((error) =>
//           of(ArtistAPIActions.loadArtistsFailure({ error }))
//         )
//       )
//     )
//   );
// });
