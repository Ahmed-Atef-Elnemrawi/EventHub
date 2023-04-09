import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class NonAuthPagesGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedIn = this.authService.isAuthenticated();

    return isLoggedIn ? false : true;
  }
}
