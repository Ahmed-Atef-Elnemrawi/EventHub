import { ActionReducerMap, combineReducers, on } from '@ngrx/store';
import { AuthState, authReducer } from './auth.reducer';
import { UserState, userReducer } from './user.reducer';
import { State } from 'src/app/state/app.state';

export interface AuthUserState{
  auth: AuthState;
  user: UserState;
}

const reducers: ActionReducerMap<AuthUserState> = {
  auth: authReducer,
  user: userReducer,
};

export const AuthUserReducer = combineReducers<AuthUserState>(reducers);
