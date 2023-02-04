import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, reduce } from 'rxjs';
import { State } from 'src/app/state/state';
import { UserApiActions } from '../state/actions';
import { UserProfile } from '../models';
import { getUserName, getUserProfile } from '../state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') SideNav!: ElementRef;

  constructor(private store: Store<State>, private render: Renderer2) {}

  ngAfterViewInit(): void {
    let buttons = document.querySelectorAll('#btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', function (e: Event) {
        buttons.forEach((btn) => btn.classList.remove('btn'));
        btn.classList.add('btn');
      });
    });
  }
  userName!: Observable<string>;
  userProfile!: Observable<UserProfile>;

  ngOnInit(): void {
    this.userName = this.store.select(getUserName);
    this.userProfile = this.store.select(getUserProfile);
  }

  toggle = () =>
    this.SideNav.nativeElement.classList.toggle('sidenav-container_show');

  logout = () => this.store.dispatch(UserApiActions.logout());

  onClick(event: Event) {}
}
