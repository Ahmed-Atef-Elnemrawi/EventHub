import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";
import { AuthUserState } from "../reducers/root.reducer";

const getAuthFeatureState = createFeatureSelector<AuthUserState>('authUser')


export const getError = createSelector(
  getAuthFeatureState,
  (state) => state.auth.error
);

export const getMessage = createSelector(
  getAuthFeatureState,
  (state) => state.auth.message
);

export const getAccessToken = createSelector(
  getAuthFeatureState,
  (state) => state.auth.tokenDto!.accessToken
);

export const getToken = createSelector(
  getAuthFeatureState,
  (state) => state.auth.tokenDto
);


