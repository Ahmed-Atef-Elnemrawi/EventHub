import { createAction, props } from '@ngrx/store';
import {
  UserForAuthDto,
  TokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UserForRegistrationDto,
} from '../../models';

export const login = createAction(
  '[Auth] Login User',
  props<{ user: UserForAuthDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: TokenDto }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failed',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout User');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failed');

export const authenticate = createAction('[Auth] Authenticate User ');
export const authenticatedSuccess = createAction('[Auth] Authenticate Success');
export const authenticatedFailure = createAction('[Auth] Authenticate Failed');

export const signup = createAction(
  '[Auth] Signup User',
  props<{ user: UserForRegistrationDto }>()
);

export const signupSuccess = createAction('[Auth] Signup Success');

export const signupFailure = createAction(
  '[Auth] Signup Failed',
  props<{ error: string }>()
);

export const forgotPassword = createAction(
  '[Auth] Forgot Password Request',
  props<{ forgotPasswordDto: ForgotPasswordDto }>()
);

export const forgotPasswordSuccess = createAction(
  '[Auth] Forgot Password Request Success'
);

export const forgotPasswordFailure = createAction(
  '[Auth] Forgot Password Request Failed',
  props<{ error: string }>()
);

export const resetPassword = createAction(
  '[Auth] reset password',
  props<{ resetPasswordDto: ResetPasswordDto }>()
);
export const resetPasswordSuccess = createAction(
  '[Auth] reset password success'
);
export const resetPasswordFailure = createAction(
  '[Auth] reset password failed',
  props<{ error: string }>()
);

export const refreshToken = createAction(
  '[Auth] refresh token',
  props<{ token: TokenDto }>()
);

export const refreshTokenSuccess = createAction(
  '[Auth] refresh token success',
  props<{ refreshToken: TokenDto }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] refresh token failed',
  props<{ error: string }>()
);
