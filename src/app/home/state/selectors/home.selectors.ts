import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from '../reducers/home.reducer';
import { state } from '@angular/animations';

const homeFeatureState = createFeatureSelector<HomeState>('home');

export const getLatestArtists = createSelector(
  homeFeatureState,
  (state) => state.latestArtists!
);

export const getLatestEvents = createSelector(
  homeFeatureState,
  (state) => state.latestEvents
);

export const getCurrentDayEvents = createSelector(
  homeFeatureState,
  (state) => state.currentDayEvents
);


export const getError = createSelector(
  homeFeatureState,
  (state) => state.error
);

export const getMessage = createSelector(
  homeFeatureState,
  (state) => state.message
);
