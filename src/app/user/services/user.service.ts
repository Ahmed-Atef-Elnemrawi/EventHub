import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShapedEntity } from "../models";
import { environment } from "src/environments/environment";


const ROOT_PATH = environment.apiUrl;
@Injectable({
  providedIn:'root'
})

export class UserService {
  private attendantsRootPath = `${ROOT_PATH}/attendants`;
  private followersRootPath = `${ROOT_PATH}/followers`;
  private producersRootPath = `${ROOT_PATH}/producers`;

  constructor(private http:HttpClient){}

  getEventsIAttend = (
    attendantId: string,
    sortBy: string = '',
    filterBy: string = '',
    pageSize: number = 0,
    pageNumber: number = 0
  ) => {
    return this.http.get<ShapedEntity[]>(
      `${this.attendantsRootPath}/${attendantId}/events-I-attend`,
      {
        headers: {
          accept: 'application/json',
        },
        params: {

        },
      }
    );
  };

  getDistinctEventIAttendDates = (attendantId: string) => {
    return this.http.get<Date[]>(
      `${this.attendantsRootPath}/${attendantId}/distinct-events-I-attend-dates`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  };

   getArtistsIFollow = (followerId: string, fields: string) => {
    return this.http.get<ShapedEntity[]>(
      `${this.followersRootPath}/${followerId}/who-Im-follow`,
      {
        headers: {
          accept: 'application/json',
        },
        params: {
          fields: `${fields}`,
        },
      }
    );
  };

   unAttendEvent= (producerId: string, eventId: string,attendantId: string) => {
    return this.http.delete(
      `${this.producersRootPath}/${producerId}/events/${eventId}/attendants/${attendantId}`
    );
  };

   unFollowArtist = (artistId: string, followerId: string) => {
    return this.http.delete(
      `${this.followersRootPath}/${followerId}/unfollow/${artistId}`
    );
  };
}
