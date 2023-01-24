import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  AuthResponse,
  ForgotPasswordDto,
  ResetPasswordDto,
  TokenDto,
  UserForAuthDto,
  UserForRegistrationDto,
} from '../../models';

export const login = createAction(
  '[User] Login User',
  props<{ user: UserForAuthDto }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  '[User] Login Failed',
  props<{ error: string }>()
);

export const LoadUser = createAction('[User] Load User');

export const logout = createAction('[User] Logout User');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout failed');

export const signup = createAction(
  '[User] Signup User',
  props<{ user: UserForRegistrationDto }>()
);

export const signupSuccess = createAction('[User] Signup Success');

export const signupFailure = createAction(
  '[User] Signup Failed',
  props<{ error: string }>()
);

export const forgotPassword = createAction(
  '[User] Forgot Password Request',
  props<{ forgotPasswordDto: ForgotPasswordDto }>()
);

export const forgotPasswordSuccess = createAction(
  '[User] Forgot Password Request Success'
);

export const forgotPasswordFailure = createAction(
  '[User] Forgot Password Request Failed',
  props<{ error: string }>()
);

export const resetPassword = createAction(
  '[User] reset password',
  props<{ resetPasswordDto: ResetPasswordDto }>()
);
export const resetPasswordSuccess = createAction(
  '[User] reset password success'
);
export const resetPasswordFailure = createAction(
  '[User] reset password failed',
  props<{ error: string }>()
);
