import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ArtistDto,
  ArtistEventDto,
  ArtistEventForManipulationDto,
  ArtistForManipulationDto,
  FollowerForCreationDto,
  ShapedEntity,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private producersRootPath = 'https://localhost:5001/api/v1.0/producers';
  private followersRootPath = 'https://localhost:5001/api/v1.0/followers';

  constructor(private http: HttpClient) {}

  createArtist = (artist: ArtistForManipulationDto) => {
    return this.http.post<ArtistDto>(`${this.producersRootPath}`, artist, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
  };

  getArtist = (userId: string) => {
    return this.http.get<ShapedEntity>(`${this.producersRootPath}/${userId}`, {
      headers: {
        accept: 'application/json',
      },
      params: {
        // fields:'firstName,lastName'
      },
    });
  };

  deleteArtist = (id: string) => {
    return this.http.delete(`${this.producersRootPath}/${id}`);
  };

  updateArtist = (artistId: string, artist: ArtistForManipulationDto) => {
    return this.http.put(`${this.producersRootPath}/${artistId}`, artist, {
      headers: { 'content-type': 'application/json' },
    });
  };

  getArtists = (searchTerm?: string) => {
    return this.http.get<ShapedEntity[]>(`${this.producersRootPath}`, {
      headers: {
        accept: 'application/json',
      },
      params: {
        searchTerm: `${searchTerm}`,
      },
    });
  };

  getArtistFollowers = (producerId: string) => {
    return this.http.get<ShapedEntity[]>(
      `${this.producersRootPath}/${producerId}/followers`,
      {
        headers: {
          accept: 'application/json',
        },
        observe: 'response',
      }
    );
  };

  createArtistFollower = (
    producerId: string,
    follower: FollowerForCreationDto
  ) => {
    return this.http.post<any>(
      `${this.producersRootPath}/${producerId}/followers`,
      follower,
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  };

  removeArtistFollower = (artistId: string, followerId: string) => {
    return this.http.delete(
      `${this.followersRootPath}/${followerId}/producers/${artistId}`
    );
  };

  isUserFollowingArtist = (followerId: string, artistId: string) => {
    return this.http.get<{ result: boolean }>(
      `${this.followersRootPath}/${followerId}/producers/${artistId}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  };

  getArtistFollowersCount = (artistId: string) =>
    this.http.get<{ followersCount: number }>(
      `${this.producersRootPath}/${artistId}/followers/followers-count`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

  getArtistEvents = (
    producerId: string,
    sortBy: string = '',
    filterBy: string = '',
    pageSize: number = 0,
    pageNumber: number = 0
  ) => {
    return this.http.get<ShapedEntity[]>(
      `${this.producersRootPath}/${producerId}/events`,
      {
        headers: {
          accept: 'application/json',
        },

        params: {
          ...this.getRequiredParams({ sortBy, filterBy }),
          pageNumber: pageNumber || 1,
          pageSize: pageSize || 5,
        },
        observe: 'response',
      }
    );
  };

  getArtistEvent = (producerId: string, eventId: string) => {
    return this.http.get<ShapedEntity>(
      `${this.producersRootPath}/${producerId}/events/${eventId}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  };

  createArtistEvent = (
    producerId: string,
    artistEvent: ArtistEventForManipulationDto
  ) => {
    return this.http.post<ArtistEventDto>(
      `${this.producersRootPath}/${producerId}/events`,
      artistEvent,
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application.json',
        },
      }
    );
  };

  updateArtistEvent = (
    producerId: string,
    eventId: string,
    artistEvent: ArtistEventForManipulationDto
  ) => {
    return this.http.put<void>(
      `${this.producersRootPath}/${producerId}/events/${eventId}`,
      artistEvent,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  removeArtistEvent = (producerId: string, eventId: string) => {
    return this.http.delete<void>(
      `${this.producersRootPath}/${producerId}/events/${eventId}`
    );
  };

  getRequiredParams(param: any): { [key: string]: string | number | boolean } {
    let obj: { [key: string]: string | boolean } = {};

    if (param['sortBy']) {
      obj['sortBy'] = param['sortBy'];
    }
    if (param['filterBy']) obj[`${param['filterBy']}`] = true;

    return obj;
  }
}
