import { createAction, props } from '@ngrx/store';
import {
  UserPage,
  UserProfile,
  UserProfileForManipulation,
} from '../../models';
import { ShapedEntity } from 'src/app/artist-home/models';

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ profile: UserProfile; userId: string; userRole: string }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failed',
  props<{ error: string }>()
);

export const updateUserProfile = createAction(
  '[User] update user profile',
  props<{ userProfile: UserProfileForManipulation; userId: string }>()
);

export const UpdateUserProfileSuccess = createAction(
  '[User] update user profile success',
  props<{ userProfile: UserProfileForManipulation }>()
);

export const updateUserProfileFailure = createAction(
  '[User] update user profile failed',
  props<{ error: string }>()
);

export const loadUserPage = createAction(
  '[user] load user page',
  props<{ userPageId: string }>()
);

export const loadUserPageSuccess = createAction(
  '[User] load user page success',
  props<{ userPage: UserPage }>()
);

export const LoadUserPageFailure = createAction(
  '[User] load user page failed',
  props<{ error: string }>()
);

export const ResetUserProfile = createAction('[User] reset user');

export const loadArtistsIFollow = createAction(
  '[User] load artists I follow',
  props<{ userId: string; fields: 'FirstName,LastName,JobTitle' }>()
);
export const loadArtistsIFollowSuccess = createAction(
  '[User] load artists I follow success',
  props<{ artists: ShapedEntity[] }>()
);
export const loadArtistsIFollowFailure = createAction(
  '[User] load artists I follow failed',
  props<{ error: string }>()
);

export const unFollowArtist = createAction(
  '[User] unFollow artist',
  props<{ userId: string; artistId: string }>()
);

export const unFollowArtistSuccess = createAction(
  '[User] unFollow artist success'
);

export const unFollowArtistFailure = createAction(
  '[User] unFollow artist failed',
  props<{ error: string }>()
);

export const loadEventsIAttend = createAction(
  '[User] load events I attend',
  props<{ userId: string }>()
);
export const loadEventsIAttendSuccess = createAction(
  '[User] load events I attend success',
  props<{ events: ShapedEntity[] }>()
);
export const loadEventsIAttendFailure = createAction(
  '[User] load events I attend failed',
  props<{ error: string }>()
);

export const loadEventsIAttendDates = createAction(
  '[User] load events I attend dates',
  props<{ userId: string }>()
);
export const loadEventsIAttendDatesSuccess = createAction(
  '[User] load events I attend dates success',
  props<{ dates: Date[] }>()
);
export const loadEventsIAttendDatesFailure = createAction(
  '[User] load events I attend dates failed',
  props<{ error: string }>()
);

export const unAttendEvent = createAction(
  '[User] un-attend event',
  props<{ artistId: string; eventId: string; userId: string }>()
);

export const unAttendEventSuccess = createAction(
  '[User] un-attend event success'
);

export const unAttendEventFailure = createAction(
  '[User] un-attend event failed',
  props<{ error: string }>()
);
