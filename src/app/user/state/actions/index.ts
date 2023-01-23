import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthResponse, TokenDto, UserForAuthDto, UserForRegistrationDto} from '../../models';

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

export const LoadUser = createAction(
  '[User] Load User',

)

export const logout = createAction('[User] Logout User');
export const logoutSuccess = createAction('[User] Logout Success');
export const logoutFailure =createAction( '[User] Logout failed');


export const signup = createAction(
  '[User] Signup User',
  props<{ user: UserForRegistrationDto }>()
);

export const signupSuccess = createAction(
  '[User] Signup Success',
  props<{ message: string }>()
);

export const signupFailure = createAction(
  '[User] Signup Fail',
  props<{ error: string }>()
);
