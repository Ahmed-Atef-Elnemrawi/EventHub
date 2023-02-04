import { createAction, props } from '@ngrx/store';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  TokenDto,
  UserForAuthDto,
  UserForRegistrationDto,
  UserProfile,
} from '../../models';

export const login = createAction(
  '[User] Login User',
  props<{ user: UserForAuthDto }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ token: TokenDto }>()
);

export const loginFailure = createAction(
  '[User] Login Failed',
  props<{ error: string }>()
);

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ profile: UserProfile, userId: string }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failed',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout User');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure = createAction('[User] Logout Failed');

export const authenticate = createAction('[User] Authenticate User ');
export const authenticatedSuccess = createAction('[User] Authenticate Success');
export const authenticatedFailure = createAction('[User] Authenticate Failed');

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

export const updateUserProfile = createAction(
  '[User] update user profile',
  props<{ userProfile: UserProfile; userId: string }>()
);

export const UpdateUserProfileSuccess = createAction(
  '[User] update user profile success',
  props<{ userProfile: UserProfile }>()
);

export const updateUserProfileFailure = createAction(
  '[User] update user profile failed',
  props<{ error: string }>()
);

