import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";


const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getIsAuthenticated = createSelector(
  getUserFeatureState,
  state => state.isAuthenticated
)

export const getError = createSelector(
  getUserFeatureState,
  state => state.error
)
