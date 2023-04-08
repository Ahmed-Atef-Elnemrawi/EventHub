import { createAction, props } from '@ngrx/store';
import {
  ArtistDto,
  ArtistEventForManipulationDto,
  ArtistForManipulationDto,
  FollowerForCreationDto,
  ShapedEntity,
} from '../../models';

export const createArtist = createAction(
  '[Artist] create artist',
  props<{ artist: ArtistForManipulationDto }>()
);

export const createArtistSuccess = createAction(
  '[Artist] create artist success',
  props<{ artist: ArtistDto }>()
);

export const createArtistFailure = createAction(
  '[Artist] create artist failed',
  props<{ error: string }>()
);

export const loadArtist = createAction(
  '[Artist] load artist',
  props<{ id: string }>()
);

export const loadArtistSuccess = createAction(
  '[Artist] load artist success',
  props<{ artist: any; artistId: string }>()
);

export const loadArtistFailure = createAction(
  '[Artist] load artist failed',
  props<{ error: string }>()
);

export const loadFollowedArtistsForUser = createAction(
  '[Artists] load all artists followed by the user',
  props<{ followerId: string; fields: string }>()
);
export const loadFollowedArtistsForUserSuccess = createAction(
  '[Artists] load all artists followed by the user success',
  props<{ artists: ShapedEntity[] }>()
);

export const loadFollowedArtistsForUserFailure = createAction(
  '[Artists] load all artists followed by the user failed',
  props<{ error: string }>()
);

export const loadArtists = createAction(
  '[Artists] load all artists',
  props<{ searchTerm?: string }>()
);

export const loadArtistsSuccess = createAction(
  '[Artists] load all artist success',
  props<{ artists: any }>()
);

export const loadArtistsFailure = createAction(
  '[Artists] load all artists failed',
  props<{ error: string }>()
);

export const updateArtist = createAction(
  '[Artist] update artist',
  props<{ artistId: string; artist: ArtistForManipulationDto }>()
);

export const updateArtistSuccess = createAction(
  '[Artist] update artist success'
);

export const updateArtistFailure = createAction(
  '[Artist] update artist failed',
  props<{ error: string }>()
);

export const deleteArtist = createAction(
  '[Artist] delete artist',
  props<{ id: string }>()
);

export const deleteArtistSuccess = createAction(
  '[Artist] delete artist success'
);

export const deleteArtistFailure = createAction(
  '[Artist] delete artist failed',
  props<{ error: string }>()
);

export const loadArtistFollowers = createAction(
  '[Artist] load all artist followers',
  props<{ artistId: string }>()
);

export const loadArtistFollowersSuccess = createAction(
  '[Artist] load all artist followers success.',
  props<{ followers: ShapedEntity[] | null }>()
);

export const loadArtistFollowersFailure = createAction(
  '[Artist] load all artist followers failed',
  props<{ error: string }>()
);

export const createArtistFollower = createAction(
  '[Artist] create artist follower',
  props<{ artistId: string; follower: FollowerForCreationDto }>()
);

export const createArtistFollowerSuccess = createAction(
  '[Artist] create artist follower success',
  props<{ follower: ShapedEntity | null }>()
);

export const createArtistFollowerFailure = createAction(
  '[Artist] create artist follower failed',
  props<{ error: string }>()
);

export const DeleteArtistFollower = createAction(
  '[Artist] delete artist follower',
  props<{ artistId: string; followerId: string }>()
);

export const DeleteArtistFollowerSuccess = createAction(
  '[Artist] delete artist follower success'
);

export const DeleteArtistFollowerFailure = createAction(
  '[Artist] delete artist follower failed',
  props<{ error: string }>()
);

export const loadIsUserFollowingArtist = createAction(
  '[Artist] check if user follows artist',
  props<{ userId: string; artistId: string }>()
);

export const loadIsUserFollowingArtistSuccess = createAction(
  '[Artist] check if user follows artist success',
  props<{ result: boolean }>()
);

export const loadIsUserFollowingArtistFailure = createAction(
  '[Artist] check if user follows artist failed',
  props<{ error: string }>()
);

export const loadArtistFollowersCount = createAction(
  '[Artist] load artist followers count',
  props<{artistId: string}>()
);

export const loadArtistFollowersCountSuccess = createAction(
  '[Artist] load artist followers count success',
  props<{ followersCount: number }>()
);

export const loadArtistFollowersCountFailure = createAction(
  '[Artist] load artist followers count failed',
  props<{ error: string }>()
);

export const loadArtistEvents = createAction(
  '[Artist] load all artist event',
  props<{ artistId: string, sortBy?:string, filterBy?:string, pageNumber?:number, pageSize?:number}>()
);

export const loadArtistEventsSuccess = createAction(
  '[Artist] load all artist events success',
  props<{ events: ShapedEntity[] | null, 'x-pagination':any }>()
);

export const loadArtistEventsFailure = createAction(
  '[Artist] load all artist events failed ',
  props<{ error: string }>()
);

export const createArtistEvent = createAction(
  '[Artist] create artist event',
  props<{ artistId: string; event: ArtistEventForManipulationDto }>()
);

export const createArtistEventSuccess = createAction(
  '[Artist] create artist event success',
  props<{ event: any }>()
);

export const CreateArtistEventFailure = createAction(
  '[Artist] create artist event failed',
  props<{ error: string }>()
);

export const loadArtistEvent = createAction(
  '[Artist] load artist event',
  props<{ artistId: string; eventId: string }>()
);

export const loadArtistEventSuccess = createAction(
  '[Artist] load artist event success',
  props<{ event: any }>()
);

export const loadArtistEventFailure = createAction(
  '[Artist] load artist event failed',
  props<{ error: string }>()
);

export const updateArtistEvent = createAction(
  '[Artist] update artist event',
  props<{
    artistId: string;
    eventId: string;
    event: ArtistEventForManipulationDto;
  }>()
);

export const updateArtistEventSuccess = createAction(
  '[Artist] update artist event success'
);

export const updateArtistEventFailure = createAction(
  '[Artist] update artist event failed',
  props<{ error: string }>()
);

export const deleteArtistEvent = createAction(
  '[Artist] delete artist event',
  props<{ artistId: string; eventId: string }>()
);

export const deleteArtistEventSuccess = createAction(
  '[Artist] delete artist event success'
);

export const deleteArtistEventFailure = createAction(
  '[Artist] delete artist event failed',
  props<{ error: string }>()
);
