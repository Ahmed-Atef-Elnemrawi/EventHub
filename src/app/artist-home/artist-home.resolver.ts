import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { UserProfile } from '../user/models';
import { ShapedEntity } from './models';
import {
  getCurrentArtist,
  getArtistEvents,
  getPagingMetaData,
  isUserFollowingArtist,
  getArtistFollowersCount,
} from './state';
import {
  loadArtist,
  loadArtistEvents,
  loadArtistFollowersCount,
  loadIsUserFollowingArtist,
} from './state/actions/artist-api-actions';
import { userSelectors } from '../user/state';
import { State } from './state/reducers/root.reducer';

@Injectable({ providedIn: 'root' })
export class ArtistHomeResolver implements Resolve<Observable<any>> {
  routeArtistId!: string;
  currentArtist$!: Observable<ShapedEntity>;
  currentArtistEvents$!: Observable<ShapedEntity[] | null>;
  GetUserFollowsCurrentArtist$!: Observable<boolean>;
  currentUserRole$!: Observable<unknown>;
  pagingMetaData$!: Observable<{ [key: string]: string }>;
  currentUserProfile$!: Observable<UserProfile | null>;
  ArtistFollowersCount$!: Observable<number>;

  constructor(private store: Store<State>) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const artistId = route.params['artistId'];
    console.log(`from artist resolver ${artistId}`);

    return of(artistId).pipe(
      switchMap((artistId) => {
        this.store.dispatch(
          loadArtist({
            id: artistId,
          })
        );

        this.store.dispatch(
          loadArtistEvents({
            artistId,
          })
        );

        this.store.dispatch(
          loadIsUserFollowingArtist({
            userId: localStorage.getItem('userId')!,
            artistId,
          })
        );

        this.store.dispatch(
          loadArtistFollowersCount({
            artistId,
          })
        );

        this.currentArtist$ = this.store.select(getCurrentArtist);

        this.currentArtistEvents$ = this.store.select(getArtistEvents);

        this.GetUserFollowsCurrentArtist$ = this.store.select(
          isUserFollowingArtist
        );

        this.currentUserRole$ = this.store.select(userSelectors.getUserRole);

        this.pagingMetaData$ = this.store.select(getPagingMetaData);

        this.currentUserProfile$ = this.store.select(
          userSelectors.getUserProfile
        );

        this.ArtistFollowersCount$ = this.store.select(getArtistFollowersCount);

        return of({
          artist$: this.currentArtist$,
          events$: this.currentArtistEvents$,
          isFollower$: this.GetUserFollowsCurrentArtist$,
          userRole$: this.currentUserRole$,
          pagingMetaData$: this.pagingMetaData$,
          userProfile$: this.currentUserProfile$,
          artistFollowersCount$: this.ArtistFollowersCount$,
        });
      })
    );
  }
}
