import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ShapedEntity,
  ArtistEventForManipulationDto,
  ArtistEventDto,
  AttendantForCreationDto,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private producersRootPath = 'https://localhost:5001/api/v1.0/producers';
  private eventsRootPath = 'https://localhost:5001/api/v1.0/events';

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
