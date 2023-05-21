import { createAction, props } from '@ngrx/store';
import { ShapedEntity } from 'src/app/user/models';

export const loadEventsBySearchTerm = createAction(
  '[Navbar] load events by search term',
  props<{ searchTerm: string }>()
);
export const loadEventsBySearchTermSuccess = createAction(
  '[Navbar] load events by search term success',
  props<{ searchedEvents: ShapedEntity[] }>()
);
export const loadEventsBySearchTermFailure = createAction(
  '[Navbar] load events by search term failure',
  props<{ error: string }>()
);

export const clearEventsResult = createAction(
  '[Navbar] clear event results'
);

export const loadArtistBySearchTerm = createAction(
  '[Navbar] load artists by search term',
  props<{ searchTerm: string }>()
);
export const loadArtistBySearchTermSuccess = createAction(
  '[Navbar] load artists by search term success',
  props<{ searchedArtists: ShapedEntity[] }>()
);
export const loadArtistBySearchTermFailure = createAction(
  '[Navbar] load artists by search term',
  props<{ error: string }>()
);

export const clearArtistsResults = createAction(
  '[Navbar] clear artist results'
)

export const loadNotificationsCount = createAction(
  '[Navbar] load notifications count',
  props<{userId: string}>()
)
export const loadNotificationsCountSuccess = createAction(
  '[Navbar] load notifications count success',
  props<{notificationsCount: number}>()
)
export const loadNotificationsCountFailure = createAction(
  '[Navbar] load notifications count failure',
  props<{error: string}>()
)

