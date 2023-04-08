import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShapedEntity } from "../models";

@Injectable({
  providedIn:'root'
})

export class UserService {
  private attendantsRootPath = 'https://localhost:5001/api/v1.0/attendants';
  private followersRootPath = 'https://localhost:5001/api/v1.0/followers';

  constructor(private http:HttpClient){}

  getEventsIAttend = (
    attendantId: string,
    sortBy: string = '',
    filterBy: string = '',
    pageSize: number = 0,
    pageNumber: number = 0
  ) => {
    return this.http.get<ShapedEntity[]>(
      `${this.attendantsRootPath}/${attendantId}/producer-events`,
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
      `${this.attendantsRootPath}/${attendantId}/distinct-producer-event-dates`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  };

    getArtistsIFollow = (followerId: string, fields: string) => {
    return this.http.get<ShapedEntity[]>(
      `${this.followersRootPath}/${followerId}/producers`,
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
}
