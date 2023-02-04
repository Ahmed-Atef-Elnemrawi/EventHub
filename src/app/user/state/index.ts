import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { UserState } from './user.reducer';
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getIsAuthenticated = createSelector(
  getUserFeatureState,
  (state) => state.isAuthenticated
);

export const getUserId = createSelector(
  getUserFeatureState,
  (state)=> state.userId
)
export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export const getUserProfile = createSelector(
  getUserFeatureState,
  (state) => state.userProfile
);

export const getUserName = createSelector(
  getUserFeatureState,
  (state) => state.userProfile.userName
);



export const getAccessToken = createSelector(
  getUserFeatureState,
  (state) => state.tokenDto.accessToken
);

export const getToken = createSelector(
  getUserFeatureState,
  (state) => state.tokenDto
);

export const getMessage = createSelector(
  getUserFeatureState,
  (state) => state.message
);


