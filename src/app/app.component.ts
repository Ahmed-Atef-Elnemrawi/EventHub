import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import { UserAPIActions } from './user/state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'EventHub';

  constructor(private store: Store<State>, private router: Router) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth) {
      this.store.dispatch(UserAPIActions.loadUser());
    }
  }
}
