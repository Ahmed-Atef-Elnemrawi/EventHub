import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { State } from '../state/state';
import { getIsAuthenticated } from './state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private destroyed$ = new Subject();
  private result!: boolean;
  constructor(private store: Store<State>, private router: Router) {}
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.store
      .select(getIsAuthenticated)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => this.result = res);

    this.router.navigateByUrl('users/login')
    return this.result;
  }
}
