import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShapedEntity } from '../user/models';
import { environment } from 'src/environments/environment';

const ROOT_PATH = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private eventPath = `${ROOT_PATH}/events`;
  private artistPath = `${ROOT_PATH}/producers`;

  constructor(private http: HttpClient) {}

  loadEventsBySearchTerm = (searchTerm: string) => {
    return this.http.get<ShapedEntity[]>(this.eventPath, {
      headers: {
        accept: 'application/json',
      },
      params: {
        searchTerm,
      },
    });
  };

  loadArtistsBySearchTerm = (searchTerm: string) => {
    return this.http.get<ShapedEntity[]>(this.artistPath, {
      headers: {
        accept: 'application/json',
      },
      params: {
        searchTerm,
      },
    });
  };

  loadNotificationCount = (userId: string) => {
    return this.http.get<{ count: number }>(
      `${ROOT_PATH}/${userId}/current-day-events/count`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  };
}
