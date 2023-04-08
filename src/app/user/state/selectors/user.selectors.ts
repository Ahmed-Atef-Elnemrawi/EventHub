import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { AuthUserState } from '../reducers/root.reducer';
const getUserFeatureState = createFeatureSelector<AuthUserState>('authUser');

export const getUserId = createSelector(
  getUserFeatureState,
  (state) => state.user.userId
);
export const getError = createSelector(
  getUserFeatureState,
  (state) => state.user.error
);

export const getUserProfile = createSelector(
  getUserFeatureState,
  (state) => state.user.userProfile
);

export const getUserName = createSelector(
  getUserFeatureState,
  (state) => state.user.userProfile?.userName!
);

export const getMessage = createSelector(
  getUserFeatureState,
  (state) => state.user.message
);

export const getIsAuthenticated = createSelector(
  getUserFeatureState,
  (state) => state.user.isAuthenticated
);

export const getUserRole = createSelector(
  getUserFeatureState,
  state => state.user.userRole??'User'
)

export const getUserPageId = createSelector(
  getUserFeatureState,
  (state) => state.user.userProfile!.userPageId
);

export const getUserPageType = createSelector(
  getUserFeatureState,
  (state) => state.user.userPage?.pageType!
);

export const getUserPageEntityId = createSelector(
  getUserFeatureState,
  (state) => state.user.userPage?.entityId || ''
);

export const isUserHaveAPage = createSelector(getUserFeatureState, (state) =>
  state.user.userPage ? true : false
);

export const getEventsIAttend = createSelector(
  getUserFeatureState,
  (state) => state.user.eventsIAttendant
);

export const getArtistsIFollow = createSelector(
  getUserFeatureState,
  (state) => state.user.artistsIFollow
);

export const getEventIAttendDates = createSelector(
  getUserFeatureState,
  (state) => state.user.eventIAttendantDates
);
