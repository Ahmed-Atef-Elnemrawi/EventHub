import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { userSelectors} from '../user/state';
import { getArtistId } from './state';
import { State } from './state/reducers/root.reducer';

@Injectable({
  providedIn: 'root',
})
export class ArtistGuard implements CanActivate, OnDestroy {
  private destroyed$ = new Subject<void>();
  actualArtistId!: string;
  userRole!: string;
  routeArtistId!: string;

  constructor(private store: Store<State>) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.routeArtistId = route.paramMap.get('artistId')!;

    this.store
      .select(userSelectors.getUserRole)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((role) => (this.userRole = role));

    this.store
      .select(getArtistId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((id) => (this.actualArtistId = id));

    if (
      this.userRole === 'Producer'
    )
      return true;

    return false;
  }
}
