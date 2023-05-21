import { createReducer, on } from '@ngrx/store';
import { UserPage, UserProfile } from '../../models';
import { ShapedEntity } from 'src/app/artist-home/models';
import { UserAPIActions } from '../actions';

export interface UserState {
  userId: string;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  userRole: string;
  error: string;
  message: string;
  userPage: UserPage | null;
  artistsIFollow: ShapedEntity[] | null;
  eventsIAttendant: ShapedEntity[] | null;
  eventIAttendantDates: Date[];
}

const initialState: UserState = {
  userId: '',
  userProfile: null,
  isAuthenticated: false,
  userRole: '',
  error: '',
  message: '',
  userPage: null,
  artistsIFollow: null,
  eventsIAttendant: null,
  eventIAttendantDates: [],
};

export const userReducer = createReducer<UserState>(
  initialState,

  on(UserAPIActions.loadUser, (state) => {
    return {
      ...state,
      message: 'load user',
      error: '',
    };
  }),

  on(UserAPIActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      error: '',
      userProfile: action.profile,
      message: 'load user success',
      isAuthenticated: true,
      userId: action.userId,
      userRole:action.userRole
    };
  }),

  on(UserAPIActions.loadUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'load user failed',
      isAuthenticated: false,
    };
  }),

  on(UserAPIActions.updateUserProfile, (state) => {
    return {
      ...state,
    };
  }),

  on(UserAPIActions.UpdateUserProfileSuccess, (state, action) => {
    return {
      ...state,
      message: 'update user profile success',
      error: '',
    };
  }),

  on(UserAPIActions.updateUserProfileFailure, (state, action) => {
    return {
      ...state,
      message: 'update user profile failed',
      error: action.error,
    };
  }),

  on(UserAPIActions.ResetUserProfile,(state, actions) =>{
    return {
      ...initialState
    }
  }),

  on(UserAPIActions.loadUserPage, (state, action) => {
    return {
      ...state,
      error: '',
      message: 'load user page',
    };
  }),

  on(UserAPIActions.loadUserPageSuccess, (state, action) => {
    return {
      ...state,
      userPage: action.userPage,
      message: 'load user page success',
    };
  }),

  on(UserAPIActions.LoadUserPageFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'load user page failed',
    };
  }),

  on(UserAPIActions.loadEventsIAttend, (state, action) => {
    return {
      ...state,
      message: 'load events I Attend',
      error: '',
    };
  }),

  on(UserAPIActions.loadEventsIAttendSuccess, (state, action) => {
    return {
      ...state,
      message: 'load events I Attend Success',
      eventsIAttendant: action.events,
    };
  }),

  on(UserAPIActions.loadEventsIAttendFailure, (state, action) => {
    return {
      ...state,
      message: 'load events I Attend Failed',
      error: action.error,
    };
  }),

  on(UserAPIActions.loadArtistsIFollow, (state, action) => {
    return {
      ...state,
      message: 'load Artists I Follow',
      error: '',
    };
  }),

  on(UserAPIActions.loadArtistsIFollowSuccess, (state, action) => {
    return {
      ...state,
      message: 'load Artists I Follow Success',
      artistsIFollow: action.artists,
    };
  }),

  on(UserAPIActions.loadArtistsIFollowFailure, (state, action) => {
    return {
      ...state,
      message: 'load Artists I Follow Failed',
      error: action.error,
    };
  }),

  on(UserAPIActions.loadEventsIAttendDates, (state, action) => {
    return {
      ...state,
      message: 'load events I attend dates',
      error: '',
    };
  }),

  on(UserAPIActions.loadEventsIAttendDatesSuccess, (state, action) => {
    return {
      ...state,
      message: 'load events I attend dates success',
      eventIAttendantDates: action.dates,
    };
  }),

  on(UserAPIActions.loadEventsIAttendDatesFailure, (state, action) => {
    return {
      ...state,
      message: 'load events I attend dates failed',
      error: action.error,
    };
  }),

  on(UserAPIActions.unAttendEvent,(state, action) =>{
    return {
      ...state,
      message:'',
      error:''
    }
  }),

  on(UserAPIActions.unAttendEventSuccess,(state, action) =>{
    return {
      ...state,
    }
  }),

  on(UserAPIActions.unAttendEventFailure,(state, action) =>{
    return {
      ...state,
      error:action.error
    }
  }),

  on(UserAPIActions.unFollowArtist,(state,action)=>{
    return{
      ...state,
      message:'',
      error:''
    }
  }),

  on(UserAPIActions.unFollowArtistSuccess,(state,action)=>{
    return{
      ...state,
    }
  }),

  on(UserAPIActions.unFollowArtistFailure,(state,action)=>{
    return{
      ...state,
      error:action.error
    }
  }),

);
