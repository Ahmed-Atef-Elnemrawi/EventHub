import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavbarState } from './reducer';

const navbarFeatureSelector = createFeatureSelector<NavbarState>('navbar');

export const getSearchedEvents = createSelector(
  navbarFeatureSelector,
  (state) => state.searchedEvents
);

export const getSearchedArtists = createSelector(
  navbarFeatureSelector,
  (state) => state.searchedArtists
);

export const getNotificationCount = createSelector(
  navbarFeatureSelector,
  (state) => state.notificationsCount
)

export const getError = createSelector(
  navbarFeatureSelector,
  (state) => state.error
);

export const getMessage = createSelector(
  navbarFeatureSelector,
  (state) => state.message
);
