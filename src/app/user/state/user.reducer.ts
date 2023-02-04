
import { createReducer, on } from '@ngrx/store';
import { TokenDto, UserProfile } from '../models';
import { ProfilePageActions, UserApiActions } from './actions';

export interface UserState {
  userId: string;
  tokenDto: TokenDto;
  userProfile: UserProfile;
  error: string;
  message: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: '',
  tokenDto: {
    accessToken: '',
    refreshToken: '',
  },
  userProfile: {
    firstName: '',
    lastName: '',
    userName: '',
    genre: '',
    age: 0,
    email: '',
    phoneNumber: '',
    country: '',
  },

  error: '',
  message: '',
  isAuthenticated: false,
};

export const authReducer = createReducer<UserState>(
  initialState,
  on(UserApiActions.login, (state, action) => {
    return {
      ...state,
      message: 'login',
      error: ''
    };
  }),

  on(UserApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      tokenDto: action.token,
      isAuthenticated: true,
      message: 'login success',
      error: '',
    };
  }),

  on(UserApiActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'login failed',
    };
  }),

  on(UserApiActions.loadUser, (state) => {
    return {
      ...state,
      message: 'load user',
      error: ''
    };
  }),

  on(UserApiActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      error: '',
      userProfile: action.profile,
      message: 'load user success',
      isAuthenticated: true,
      userId: action.userId,
    };
  }),

  on(UserApiActions.loadUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'load user failed',
      isAuthenticated: false,
    };
  }),

  on(UserApiActions.logout, (state) => {
    return {
      ...state,
      message: 'logout',
      error: ''
    };
  }),

  on(UserApiActions.logoutSuccess, (state) => {
    return {
      ...state,
      userId: '',
      tokenDto: {
        accessToken: '',
        refreshToken: '',
      },
      userProfile: {
        firstName: '',
        lastName: '',
        userName: '',
        genre: '',
        age: 0,
        email: '',
        phoneNumber: '',
        country: '',
      },
      isAuthenticated: false,
      message: 'logout success',
      error: '',
    };
  }),

  on(UserApiActions.logoutFailure, (state) => {
    return {
      ...state,
      message: 'logout cancelled',
      isAuthenticated: false,
    };
  }),

  on(UserApiActions.signup, (state) => {
    return {
      ...state,
    };
  }),

  on(UserApiActions.signupSuccess, (state) => {
    return {
      ...state,
      message: 'signup success',
      error: '',
    };
  }),

  on(UserApiActions.signupFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'signup failed!',
    };
  }),

  on(UserApiActions.forgotPassword, (state) => {
    return {
      ...state,
    };
  }),

  on(UserApiActions.forgotPasswordSuccess, (state) => {
    return {
      ...state,
      message: 'forgot password request success',
      error: '',
    };
  }),

  on(UserApiActions.forgotPasswordFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'forgot password request failed',
    };
  }),

  on(UserApiActions.resetPassword, (state) => {
    return {
      ...state,
    };
  }),

  on(UserApiActions.resetPasswordSuccess, (state) => {
    return {
      ...state,
      message: 'reset password success',
      error: '',
    };
  }),

  on(UserApiActions.resetPasswordFailure, (state, action) => {
    return {
      ...state,
      message: 'reset password success',
      error: action.error,
    };
  }),

  on(UserApiActions.updateUserProfile, (state) => {
    return {
      ...state,
    };
  }),

  on(UserApiActions.UpdateUserProfileSuccess, (state, action) => {
    return {
      ...state,
      userProfile: action.userProfile,
      message: 'update user profile success',
      error: '',
    };
  }),

  on(UserApiActions.updateUserProfileFailure, (state, action) => {
    return {
      ...state,
      message: 'update user profile failed',
      error: action.error,
    };
  }),




);
