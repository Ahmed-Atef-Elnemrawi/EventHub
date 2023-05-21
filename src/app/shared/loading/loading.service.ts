import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Section {
  Artists = 'producers',
  Events = 'events',
  EventsIAttend = 'events-I-attend',
  WhoImFollow = 'who-Im-follow',
  User = 'login',
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isArtistsLoaded$ = new BehaviorSubject<boolean>(false);
  isEventsLoaded$ = new BehaviorSubject<boolean>(false);
  isEventsIAttendLoaded$ = new BehaviorSubject<boolean>(false);
  isWhoImFollowLoaded$ = new BehaviorSubject<boolean>(false);
  isUserLoaded$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  setLoadingState(section: Section | string, state: boolean) {
    switch (section) {
      case Section.Artists:
        this.isArtistsLoaded$.next(state);
        break;

      case Section.Events:
        this.isEventsLoaded$.next(state);
        break;

      case Section.EventsIAttend:
        this.isEventsIAttendLoaded$.next(state);
        break;

      case Section.WhoImFollow:
        this.isWhoImFollowLoaded$.next(state);
        break;

      case Section.User:
        this.isUserLoaded$.next(state);
        break;

      default:
        return;
    }
  }
}
