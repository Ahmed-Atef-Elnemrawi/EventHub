import { createReducer, on } from '@ngrx/store';
import { TokenDto, UserProfile } from '../models';
import * as AuthActions from '../state/actions';

export interface UserState {
  tokenDto: TokenDto;
  userProfile: UserProfile;
  error: string;
  message: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  tokenDto: {
    accessToken: '',
    refreshToken: '',
  },
  userProfile: {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    genre: '',
    age: 0,
    email: '',
    phoneNumber: '',
    country: '',
    profilePicture: '',
  },

  error: '',
  message: '',
  isAuthenticated: false,
};

export const authReducer = createReducer<UserState>(
  initialState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      message: 'login',
    };
  }),

  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      tokenDto: action.authResponse.tokenDto,
      userProfile: action.authResponse.userProfile,
      isAuthenticated: true,
      message: 'login success',
      error: '',
    };
  }),

  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'login failed',
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      message: 'logout',
    };
  }),

  on(AuthActions.logoutSuccess, (state) => {
    return {
      ...state,
      tokenDto: {
        accessToken: '',
        refreshToken: '',
      },
      userProfile: {
        id:'',
        firstName: '',
        lastName: '',
        userName: '',
        genre: '',
        age: 0,
        email: '',
        phoneNumber: '',
        country: '',
        profilePicture: '',
      },
      message: 'logout success'
    };
  }),

  on(AuthActions.logoutFailure, (state) =>{
    return {
      ...state,
      message: 'logout cancelled',
      isAuthenticated: false
    }
  })

);
