import { createReducer, on } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { ShapedEntity } from '../../models';
import { ArtistAPIActions } from '../actions';
import { state } from '@angular/animations';
;

export interface ArtistState{
  artist: any;
  artistId: string;
  events: ShapedEntity[] | null;
  followers: ShapedEntity[] | null;
  followersCount: number
  isUserFollowMe: boolean;
  'x-pagination': any;
  message: string;
  error: string;


}

const initialState: ArtistState = {
  artist: null,
  artistId: '',
  events: null,
  followers: null,
  followersCount: 0,
  isUserFollowMe: false,
  message: '',
  error: '',
  'x-pagination': {}
};

export const artistReducer = createReducer<ArtistState>(
  initialState,
  on(ArtistAPIActions.createArtist, (state, action) => {
    return {
      ...state,
      error: '',
      message: '',
    };
  }),

  on(ArtistAPIActions.createArtistSuccess, (state, action) => {
    return {
      ...state,
      artist: action.artist,
      message: 'create artist success',
    };
  }),

  on(ArtistAPIActions.createArtistFailure, (state, action) => {
    return {
      ...state,
      error: action.error,

      message: 'create artist failed',
    };
  }),

  on(ArtistAPIActions.updateArtist, (state, action) => {
    return {
      ...state,
      message: 'update artist',
      error: '',
    };
  }),

  on(ArtistAPIActions.updateArtistSuccess, (state, action) => {
    return {
      ...state,
      message: 'update artist success',
      error: '',
    };
  }),

  on(ArtistAPIActions.updateArtistFailure, (state, action) => {
    return {
      ...state,
      message: 'update artist failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.deleteArtist, (state, action) => {
    return {
      ...state,
      message: 'delete artist',
      error: '',
    };
  }),

  on(ArtistAPIActions.deleteArtistSuccess, (state, action) => {
    return {
      ...state,
      message: 'delete artist success',
      error: '',
    };
  }),

  on(ArtistAPIActions.deleteArtistFailure, (state, action) => {
    return {
      ...state,
      message: 'delete artist failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.loadArtist, (state, action) => {
    return {
      ...state,
      message: 'get artist',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadArtistSuccess, (state, action) => {
    return {
      ...state,
      artist: action.artist,
      artistId: action.artistId,
      message: 'load artist success',
    };
  }),

  on(ArtistAPIActions.loadArtistFailure, (state, action) => {
    return {
      ...state,
      message: 'load artist failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.loadArtists, (state, action) => {
    return {
      ...state,
      message: 'load all artists',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadArtistsSuccess, (state, action) => {
    return {
      ...state,
      artists: action.artists,
      message: 'load all artists success',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadArtistsFailure, (state, action) => {
    return {
      ...state,
      message: 'load all artist failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.loadArtistFollowers, (state, action) => {
    return {
      ...state,
      message: 'load all artist followers',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadArtistFollowersSuccess, (state, action) => {
    return {
      ...state,
      message: 'load all artist followers success',
      followers: action.followers,
    };
  }),

  on(ArtistAPIActions.loadArtistFollowersFailure, (state, action) => {
    return {
      ...state,
      message: 'load all artist followers failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.createArtistFollower, (state, action) => {
    return {
      ...state,
      message: 'create artist follower',
      error: '',
    };
  }),

  on(ArtistAPIActions.createArtistFollowerSuccess, (state, action) => {
    return {
      ...state,
      isFollowTheArtist: true,
      follower: action.follower,
    };
  }),

  on(ArtistAPIActions.createArtistFollowerFailure, (state, action) => {
    return {
      ...state,
      message: 'create artist follower failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.DeleteArtistFollower, (state, action) => {
    return {
      ...state,
      message: 'delete artist follower',
      error: '',
    };
  }),

  on(ArtistAPIActions.DeleteArtistFollowerSuccess, (state, action) => {
    return {
      ...state,
      isFollowTheArtist: false,
      message: 'delete artist follower success',
    };
  }),

  on(ArtistAPIActions.DeleteArtistFollowerFailure, (state, action) => {
    return {
      ...state,
      message: 'delete artist follower failed',
      error: action.error,
    };
  }),

  on(ArtistAPIActions.loadArtistFollowersCount, (state, action) => {
    return {
      ...state,
      message: 'load artist followers count',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadArtistFollowersCountSuccess,
    (state, action) => {
      return {
        ...state,
        followersCount: action.followersCount,
        message: 'load artist followers count success',
      };
    }
  ),

  on(ArtistAPIActions.loadArtistFollowersCountFailure,
    (state, action) => {
      return {
        ...state,
        message: 'load artist followers count failed',
        error: action.error,
      };
    }
  ),

  on(ArtistAPIActions.loadIsUserFollowingArtist, (state, action) => {
    return {
      ...state,
      message: 'check if the user follows artist',
      error: '',
    };
  }),

  on(ArtistAPIActions.loadIsUserFollowingArtistSuccess,
    (state, action) => {
      return {
        ...state,
        message: 'check if the user follows artist',
        isUserFollowMe: action.result,
      };
    }
  ),

  on(ArtistAPIActions.loadIsUserFollowingArtistFailure,
    (state, action) => {
      return {
        ...state,
        message: 'check if the user follows artist',
        error: action.error,
      };
    }
  ),

  on(ArtistAPIActions.loadArtistEvents,(state, action) =>{
    return {
      ...state,
      message:'load artist event',
      error:''
    }
  }),

  on(ArtistAPIActions.loadArtistEventsSuccess,(state, action) =>{
    return {
      ...state,
      message:'load artist events success',
      events:action.events,
      "x-pagination":action['x-pagination']
    }
  }),

  on(ArtistAPIActions.loadArtistEventsFailure,(state, action) =>{
    return {
      ...state,
      message:'load artist event failed',
      error:action.error
    }
  }),

  on(ArtistAPIActions.createArtistEvent,(state, action) =>{
    return{
      ...state,
      message:'create artist event',
      error:''
    }
  }),

  on(ArtistAPIActions.createArtistEventSuccess,(state, action) =>{
    return{
      ...state,
      message:'create artist event',
    }
  }),

  on(ArtistAPIActions.CreateArtistEventFailure,(state, action) =>{
    return{
      ...state,
      message:'create artist event',
      error:action.error
    }
  }),

  on(ArtistAPIActions.updateArtistEvent,(state, action) =>{
    return {
      ...state,
      message:'update artist event',
      error:''
    }
  }),

  on(ArtistAPIActions.updateArtistEventSuccess,(state, action) =>{
    return {
      ...state,
      message:'update artist event success',
    }
  }),

  on(ArtistAPIActions.updateArtistEventFailure,(state, action) =>{
    return {
      ...state,
      message:'update artist event failed',
      error:action.error
    }
  }),

  on(ArtistAPIActions.deleteArtistEvent, (state, action) =>{
    return {
      ...state,
      message:'delete artist event',
      error:''
    }
  }),

  on(ArtistAPIActions.deleteArtistEventSuccess, (state, action) =>{
    return {
      ...state,
      message:'delete artist event success',
    }
  }),

  on(ArtistAPIActions.deleteArtistEventFailure, (state, action) =>{
    return {
      ...state,
      message:'delete artist event failed',
      error:action.error
    }
  }),
);
