import { createReducer, createSelector, on } from '@ngrx/store';
import { TokenDto } from '../../models';
import { AuthAPIAction } from '../actions';

export interface AuthState {
  tokenDto: TokenDto | null;
  error: string;
  message: string;

}

const InitialAuthState : AuthState = {
  tokenDto: null,
  error: '',
  message: '',
}


export const authReducer = createReducer<AuthState>(
  InitialAuthState,

on(AuthAPIAction.login, (state, action) => {
    return {
      ...state,
      message: 'login',
      error: ''
    };
  }),

  on(AuthAPIAction.loginSuccess, (state, action) => {
    return {
      ...state,
      tokenDto: action.token,
      message: 'login success',
      error: '',
    };
  }),

  on(AuthAPIAction.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'login failed',
    };
  }),

   on(AuthAPIAction.logout, (state) => {
    return {
      ...state,
      message: 'logout',
      error: ''
    };
  }),

  on(AuthAPIAction.logoutSuccess, (state) => {
    return {
      ...state,
      userId: '',
      tokenDto: null,
      error: '',
    };
  }),

  on(AuthAPIAction.logoutFailure, (state) => {
    return {
      ...state,
      message: 'logout cancelled',
    };
  }),

  on(AuthAPIAction.signup, (state) => {
    return {
      ...state,
    };
  }),

  on(AuthAPIAction.signupSuccess, (state) => {
    return {
      ...state,
      message: 'signup success',
      error: '',
    };
  }),

  on(AuthAPIAction.signupFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'signup failed!',
    };
  }),

  on(AuthAPIAction.forgotPassword, (state) => {
    return {
      ...state,
    };
  }),

  on(AuthAPIAction.forgotPasswordSuccess, (state) => {
    return {
      ...state,
      message: 'forgot password request success',
      error: '',
    };
  }),

  on(AuthAPIAction.forgotPasswordFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      message: 'forgot password request failed',
    };
  }),

  on(AuthAPIAction.resetPassword, (state) => {
    return {
      ...state,
    };
  }),

  on(AuthAPIAction.resetPasswordSuccess, (state) => {
    return {
      ...state,
      message: 'reset password success',
      error: '',
    };
  }),

  on(AuthAPIAction.resetPasswordFailure, (state, action) => {
    return {
      ...state,
      message: 'reset password success',
      error: action.error,
    };
  }),


)
