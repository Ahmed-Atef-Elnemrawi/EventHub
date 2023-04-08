import { State } from 'src/app/state/app.state';
import { ShapedEntity } from '../../models';
import { createReducer, on } from '@ngrx/store';
import { ArtistEventAPIActions } from '../actions';

export interface EventState{
  event: ShapedEntity | null;
  eventId: string;
  artistId:string;
  attendants: ShapedEntity[] | null;
  message: string;
  error: string;
  'x-pagination': any;
}

const initialEventState: EventState = {
  event: null,
  eventId: '',
  artistId: '',
  attendants: null,
  message: '',
  error: '',
  'x-pagination': {},
};

export const eventReducer = createReducer(
  initialEventState,

 on(ArtistEventAPIActions.loadArtistEventAttendants,
  (state, action) => {
    return {
      ...state,
      message: 'load all artist event attendants',
      artistId:action.artistId,
      eventId:action.eventId,
      error: '',
    };
  }),

  on(ArtistEventAPIActions.loadArtistEventAttendantsSuccess,
    (state, action) => {
      return {
        ...state,
        message: 'load all artist event attendants success',
        eventAttendants: action.attendants,
      };
    }
  ),

  on(ArtistEventAPIActions.loadArtistEventAttendantsFailure,
    (state, action) => {
      return {
        ...state,
        message: 'load all artist event attendants failed',
        error: action.error,
      };
    }
  ),

  on(ArtistEventAPIActions.createArtistEventAttendant,
    (state, action) => {
      return {
        ...state,
        message: 'create artist event attendant',
        error: '',
      };
    }
  ),

  on(ArtistEventAPIActions.createArtistEventAttendantSuccess,
    (state, action) => {
      return {
        ...state,
        message: 'create artist event attendant success',
      };
    }
  ),

  on(ArtistEventAPIActions.createArtistEventAttendantFailure,
    (state, action) => {
      return {
        ...state,
        message: 'create artist event attendant',
        error: action.error,
      };
    }
  ),

  on(ArtistEventAPIActions.DeleteArtistEventAttendant,
    (state, action) => {
      return {
        ...state,
        message: 'delete artist event attendant',
        error: '',
      };
    }
  ),

  on(ArtistEventAPIActions.DeleteArtistEventAttendantSuccess,
    (state, action) => {
      return {
        ...state,
        message: 'delete artist event attendant success',
      };
    }
  ),

  on(ArtistEventAPIActions.DeleteArtistEventAttendantFailure,
    (state, action) => {
      return {
        ...state,
        message: 'delete artist event attendant failed',
        error: action.error,
      };
    }
  ),
);
