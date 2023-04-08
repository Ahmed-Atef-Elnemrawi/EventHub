import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { PageType, UserProfile } from '../models';


import { Router } from '@angular/router';
import { AuthAPIAction } from '../state/actions';
import { userSelectors } from '../state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ProfileComponent implements OnInit{
  @ViewChild('sidenav') SideNav!: ElementRef;
  userName$!: Observable<string>;
  userProfile$!: Observable<UserProfile>;
  userRole$!: Observable<string>;
  userId$!: Observable<string>;
  artistId$!: Observable<string>;
  artistPageId$!: Observable<string>;
  userPageType$!: Observable<string>;

  constructor(private store: Store<State>, private router: Router) {}


  ngOnInit(): void {
    this.userName$ = this.store.select(userSelectors.getUserName);
    this.userRole$ = this.store.select(userSelectors.getUserRole);
    this.userId$ = this.store.select(userSelectors.getUserId);
    this.artistId$ = this.store.select(userSelectors.getUserPageEntityId);
  }

  toggle = () =>
    this.SideNav.nativeElement.classList.toggle('sidenav-container_show');

  logout = () => this.store.dispatch(AuthAPIAction.logout());

  loadPage = () => {
    let artistPageId = localStorage.getItem('entityId');
    let pageType = +JSON.parse(localStorage.getItem('pageType')!);

    if (artistPageId !== null && pageType === PageType.artist) {
      this.router.navigateByUrl(`artists/${artistPageId}`);
      return;
    } else this.router.navigateByUrl('artists/0/add');
  };

}
