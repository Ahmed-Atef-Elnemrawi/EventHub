import { ShapedEntity } from 'src/app/user/models';
import * as AppState from '../../state/app.state';
import { createReducer, on } from '@ngrx/store';
import * as NavbarActions from './actions';

export interface State extends AppState.State {
  navbarState: NavbarState;
}

export interface NavbarState {
  searchedEvents: ShapedEntity[] | null;
  searchedArtists: ShapedEntity[] | null;
  notificationsCount:number;
  message: string;
  error: string;
}

const initialState: NavbarState = {
  searchedEvents: null,
  searchedArtists: null,
  message: '',
  error: '',
  notificationsCount: 0
};

export const navbarReducer = createReducer(
  initialState,
  on(NavbarActions.loadArtistBySearchTerm, (state, action) => {
    return {
      ...state,
      message: '',
      error: '',
    };
  }),

  on(NavbarActions.loadArtistBySearchTermSuccess, (state, action) => {
    return {
      ...state,
      searchedArtists: action.searchedArtists,
    };
  }),

  on(NavbarActions.loadArtistBySearchTermFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(NavbarActions.loadEventsBySearchTerm, (state, action) => {
    return {
      ...state,
      message: '',
      error: '',
    };
  }),

  on(NavbarActions.loadEventsBySearchTermSuccess, (state, action) => {
    return {
      ...state,
      searchedEvents: action.searchedEvents,
    };
  }),

  on(NavbarActions.loadEventsBySearchTermFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(NavbarActions.clearEventsResult, (state, action) =>{
    return{
      ...state,
      error:'',
      message:'',
      searchedEvents : null
    }
  }),

  on(NavbarActions.clearArtistsResults, (state, action) =>{
    return {
      ...state,
      error:'',
      message:'',
      searchedArtists: null
    }
  }),

  on(NavbarActions.loadNotificationsCount, (state, action) =>{
    return {
      ...state,
      error:'',
      message:''
    }
  }),
  on(NavbarActions.loadNotificationsCountSuccess, (state, action) =>{
    return {
      ...state,
      notificationsCount: action.notificationsCount
    }
  }),
  on(NavbarActions.loadNotificationsCountFailure, (state, action) =>{
    return {
      ...state,
      error:action.error
    }
  }),
);
