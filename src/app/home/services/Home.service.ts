import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShapedEntity } from '../models';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const ROOT_PATH = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private eventPath = ROOT_PATH + '/events';
  private producerPath = ROOT_PATH + '/producers';

  pagePartName$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  navToPagePart(name: string) {
    this.pagePartName$.next(name);
  }

  getNewestArtists = (pageSize: number = 2) =>
    this.http.get<ShapedEntity[]>(this.producerPath, {
      headers: {
        accept: 'application/json',
      },
      params: {
        latest: true,
        pageSize,
      },
    });

  getNewestEvents = (pageSize: number = 2) =>
    this.http.get<ShapedEntity[]>(this.eventPath, {
      headers: {
        accept: 'application/json',
      },
      params: {
        upcoming: true,
        pageSize,
      },
    });

  getCurrentDayEvents = (userId: string) =>
    this.http.get<ShapedEntity[]>(`${ROOT_PATH}/${userId}/current-day-events`, {
      headers: {
        accept: 'application/json',
      },
      params: {
        fields: 'name,date,producer',
      },
    });
}
