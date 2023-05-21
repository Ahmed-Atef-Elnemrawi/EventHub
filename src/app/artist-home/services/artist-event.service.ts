import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ShapedEntity,
  ArtistEventForManipulationDto,
  ArtistEventDto,
  AttendantForCreationDto,
} from '../models';
import { environment } from 'src/environments/environment';

const ROOT_PATH = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private producersRootPath = `${ROOT_PATH}/producers`;
  private eventsRootPath = `${ROOT_PATH}/events`;

  constructor(private http: HttpClient) {}

  createEventAttendant = (
    producerId: string,
    eventId: string,
    attendant: AttendantForCreationDto
  ) => {
    return this.http.post<any>(
      `${this.producersRootPath}/${producerId}/events/${eventId}/attendants`,
      attendant,
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  };

  removeEventAttendant = (
    producerId: string,
    eventId: string,
    attendantId: string
  ) => {
    return this.http.delete(
      `${this.producersRootPath}/${producerId}/events/${eventId}/attendants/${attendantId}`
    );
  };

  getEventAttendants = (producerId: string, eventId: string) => {
    return this.http.get<ShapedEntity[]>(
      `${this.producersRootPath}/${producerId}/events/${eventId}/attendants`,
      {
        headers: {
          accept: 'application/json',
        },
        observe: 'response',
      }
    );
  };

  getAllEvents = (searchTerm?: string) =>
    this.http.get<ShapedEntity[]>(`${this.eventsRootPath}`, {
      headers: {
        accept: 'application/json',
      },
      params: {
        SearchTerm: `${searchTerm}`,
      },
    });
}
