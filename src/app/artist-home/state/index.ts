import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistAndEventState } from './reducers/root.reducer';

const getArtistFeatureState = createFeatureSelector<ArtistAndEventState>('AAE');

export const getError = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.error
);

export const getArtistId = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.artistId
);

export const getCurrentArtist = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.artist
);

export const isArtistLoaded = createSelector(getArtistFeatureState, (state) =>
  Boolean(state.artistState.artist)
);

export const getArtistEvents = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.events
);

export const getPagingMetaData = createSelector(
  getArtistFeatureState,
  (state) => state.artistState['x-pagination']
);

export const getCurrentEvent = (eventId: string) =>
  createSelector(
    getArtistFeatureState,
    (state) => state.artistState.events?.find((e) => e.id === eventId) || null

  );

export const getCurrentEventId = createSelector(
  getArtistFeatureState,
  (state) => state.eventState.eventId
);


export const isUserFollowingArtist = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.isUserFollowMe
);



export const getArtistFollowersCount = createSelector(
  getArtistFeatureState,
  (state) => state.artistState.followersCount
);


