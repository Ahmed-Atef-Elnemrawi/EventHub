import { createAction, props } from '@ngrx/store';
import { AttendantForCreationDto, ShapedEntity } from '../../models';


export const loadArtistEventAttendants = createAction(
  '[Artist Event] load all artist event attendants',
  props<{ artistId: string; eventId: string }>()
);

export const loadArtistEventAttendantsSuccess = createAction(
  '[Artist Event] load all artist event attendants success',
  props<{ attendants: ShapedEntity[] | null }>()
);

export const loadArtistEventAttendantsFailure = createAction(
  '[Artist Event] load all artist event attendants failed',
  props<{ error: string }>()
);

export const createArtistEventAttendant = createAction(
  '[Artist Event] create artist event attendant',
  props<{
    artistId: string;
    eventId: string;
    attendant: AttendantForCreationDto;
  }>()
);

export const createArtistEventAttendantSuccess = createAction(
  '[Artist Event] create artist event attendant success'
);

export const createArtistEventAttendantFailure = createAction(
  '[Artist Event] create artist event attendant failed',
  props<{ error: string }>()
);

export const DeleteArtistEventAttendant = createAction(
  '[Artist Event] delete artist event attendant',
  props<{ artistId: string; eventId: string; attendantId: string }>()
);

export const DeleteArtistEventAttendantSuccess = createAction(
  '[Artist Event] delete artist event attendant success'
);

export const DeleteArtistEventAttendantFailure = createAction(
  '[Artist Event] delete artist event attendant failed',
  props<{ error: string }>()
);


