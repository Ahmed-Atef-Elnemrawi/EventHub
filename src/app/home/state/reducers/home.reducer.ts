import { createReducer, on } from '@ngrx/store';
import { HomeAPIActions } from '../actions';
import { ShapedEntity } from 'src/app/user/models';
import * as AppState from 'src/app/state/app.state';

export interface State extends AppState.State {
  home: HomeState;
}

export interface HomeState {
  latestArtists: ShapedEntity[] | null;
  latestEvents: ShapedEntity[] | null;
  currentDayEvents: ShapedEntity[] | null;
  error: string;
  message: string;
}

const initialHomeState: HomeState = {
  latestArtists: null,
  latestEvents: null,
  currentDayEvents: null,
  error: '',
  message: '',
};

export const homeReducer = createReducer(
  initialHomeState,
  on(HomeAPIActions.loadLatestArtists, (state, action) => {
    return {
      ...state,
      error: '',
      message: '',
    };
  }),

  on(HomeAPIActions.loadLatestArtistsSuccess, (state, action) => {
    return {
      ...state,
      latestArtists: action.artists,
    };
  }),

  on(HomeAPIActions.loadLatestArtistsFailure, (state, action) => {
    return {
      ...state,
      error: '',
    };
  }),

  on(HomeAPIActions.loadLatestEvents, (state, action) => {
    return {
      ...state,
      error: '',
      message: '',
    };
  }),

  on(HomeAPIActions.loadLatestEventsSuccess, (state, action) => {
    return {
      ...state,
      latestEvents: action.events,
    };
  }),

  on(HomeAPIActions.loadLatestEventsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(HomeAPIActions.loadMoreArtists, (state, action) => {
    return {
      ...state,
    };
  }),

  on(HomeAPIActions.loadMoreEvents, (state, action) => {
    return {
      ...state,
    };
  }),
  on(HomeAPIActions.loadCurrentDayEvent, (state, action) => {
    return {
      ...state,
      error: '',
      message: '',
    };
  }),

  on(HomeAPIActions.loadCurrentDayEventSuccess, (state, action) => {
    return {
      ...state,
      currentDayEvents: action.currentDayEvents,
    };
  }),

  on(HomeAPIActions.loadCurrentDayEventFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
