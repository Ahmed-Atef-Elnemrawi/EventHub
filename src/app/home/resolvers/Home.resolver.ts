import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { State } from '../state/reducers/home.reducer';
import { HomeAPIActions } from '../state/actions';
import { getCurrentDayEvents, getLatestArtists, getLatestEvents } from '../state/selectors/home.selectors';
import { getUserId } from 'src/app/user/state/selectors/user.selectors';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<any> {

  constructor(private store:Store<State>){}

      private userId = localStorage.getItem('userId')!;
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return of(route.url.toString()).pipe(
      switchMap(() => {


        this.store.dispatch(HomeAPIActions.loadLatestArtists({pageSize:2}));
        this.store.dispatch(HomeAPIActions.loadLatestEvents({pageSize:2}));
        if(this.userId){
          console.log('userId: ' + this.userId)
          this.store.dispatch(HomeAPIActions.loadCurrentDayEvent({userId: this.userId}))
        }

        const artists$ = this.store.select(getLatestArtists);
        const events$ = this.store.select(getLatestEvents);
        const notifications$ = this.store.select(getCurrentDayEvents);
        const userId$ = this.store.select(getUserId)


        return of({userId$, artists$, events$, notifications$})
      })
    )
  }
}
