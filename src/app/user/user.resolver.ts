import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { State } from '../state/app.state';
import { UserAPIActions } from './state/actions';
import { userSelectors } from './state';

const WHO_IM_FOLLOW = 'who-Im-follow';
const EVENTS_I_ATTEND = 'events-I-attend';
const FIELDS = 'FirstName,LastName,JobTitle';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<State>) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const userId: string = route.parent?.params['userId'];
    const routePath = route.url.toString();
    return of(routePath).pipe(
      switchMap((path) => {
        switch (path) {
          case WHO_IM_FOLLOW:
            this.store.dispatch(
              UserAPIActions.loadArtistsIFollow({
                userId,
                fields: FIELDS,
              })
            );

            const artists$ = this.store.select(userSelectors.getArtistsIFollow);
            return of({ userId, artists$ });

          case EVENTS_I_ATTEND:
            this.store.dispatch(
              UserAPIActions.loadEventsIAttend({
                userId,
              })
            );

            this.store.dispatch(
              UserAPIActions.loadEventsIAttendDates({
                userId,
              })
            );

            const events$ = this.store.select(userSelectors.getEventsIAttend);
            const dates$ = this.store.select(
              userSelectors.getEventIAttendDates
            );

            return of({
              userId,
              events$,
              dates$,
            });

          default:
            return EMPTY;
        }
      })
    );
  }
}
