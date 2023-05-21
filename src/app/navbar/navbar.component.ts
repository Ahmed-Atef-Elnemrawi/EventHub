import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { State } from '../state/app.state';
import { UserProfile } from '../user/models';
import { ShapedEntity } from '../artist-home/models';
import { AuthAPIAction } from '../user/state/actions';
import { userSelectors } from '../user/state';
import * as NavbarActions from './state/actions';
import * as Selectors from './state/selectors';
import { getCurrentDayEvents } from '../home/state/selectors/home.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string>;
  userId$!: Observable<string>;
  isHaveAPage$!: Observable<boolean>;
  userRole$!: Observable<string>;
  avatarName!: string;
  searchForm!: FormGroup;
  searchResult$!: Observable<ShapedEntity[] | null>;
  notificationsCount$!: Observable<number>;

  notificationTempState:boolean = false;

  currentDayEvents$!: Observable<ShapedEntity[] | null>;

  private toggleNotificationSub$ = new BehaviorSubject<boolean>(false);
  toggleNotification$ = this.toggleNotificationSub$.asObservable();
  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: '',
      searchCategory: 'event',
    });

    const searchField = this.searchForm.controls['searchCategory'];
    const searchControl = this.searchForm.controls['search'];

    searchControl.valueChanges
      .pipe(
        debounceTime(500),
        tap((searchTerm) => {
          this.handleSearch(searchField?.value, searchTerm);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    this.isAuthenticated$ = this.store.select(userSelectors.getIsAuthenticated);
    this.userName$ = this.store.select(userSelectors.getUserName);
    this.userId$ = this.store.select(userSelectors.getUserId);
    this.isHaveAPage$ = this.store.select(userSelectors.isUserHaveAPage);
    this.userRole$ = this.store.select(userSelectors.getUserRole);
    this.notificationsCount$ = this.store.select(Selectors.getNotificationCount);
    this.currentDayEvents$ = this.store.select(getCurrentDayEvents);

    this.store
      .select(userSelectors.getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((info) => this.getAvatarName(info!));
  }

  logout = () => this.store.dispatch(AuthAPIAction.logout());

  handleSearch(searchField: string, searchTerm: string) {
    if (searchField === 'artist') {
      !!searchTerm
        ? this.store.dispatch(
            NavbarActions.loadArtistBySearchTerm({
              searchTerm,
            })
          )
        : this.store.dispatch(NavbarActions.clearArtistsResults());

      this.searchResult$ = this.store.select(Selectors.getSearchedArtists);
    }

    if (searchField === 'event') {
      !!searchTerm
        ? this.store.dispatch(
            NavbarActions.loadEventsBySearchTerm({
              searchTerm,
            })
          )
        : this.store.dispatch(NavbarActions.clearEventsResult());

      this.searchResult$ = this.store.select(Selectors.getSearchedEvents);
    }
  }

  showSearch() {
    const container: HTMLElement =
      this.el.nativeElement.querySelector('#search-container');

    const searchIcon = this.el.nativeElement.querySelector('#search-icon');
    const closeIcon: HTMLElement = this.renderer.createElement('span');
    closeIcon.innerHTML = '&#x2715;';
    closeIcon.classList.add('close-btn');

    this.renderer.setStyle(container, 'display', 'block');

    searchIcon?.replaceWith(closeIcon);

    this.renderer.listen(closeIcon, 'click', () => {
      this.store.dispatch(NavbarActions.clearArtistsResults());
      this.store.dispatch(NavbarActions.clearEventsResult());
      this.renderer.removeStyle(container, 'display');
      closeIcon?.replaceWith(searchIcon);
    });
  }

  showClearBtn() {
    const searchIcon = this.el.nativeElement.querySelector('#search-icon');
    const closeIcon: HTMLElement = this.renderer.createElement('span');
    const search = this.el.nativeElement.querySelector('.search');

    closeIcon.innerHTML = '&#x2715;';
    closeIcon.classList.add('close-btn');
    searchIcon?.replaceWith(closeIcon);

    this.renderer.listen(closeIcon, 'click', () => {
      closeIcon?.replaceWith(searchIcon);
      this.store.dispatch(NavbarActions.clearArtistsResults());
      this.store.dispatch(NavbarActions.clearEventsResult());
    });

    this.renderer.listen(search,'input',() =>{
      if(search?.value === ''){
      closeIcon?.replaceWith(searchIcon);
      this.store.dispatch(NavbarActions.clearArtistsResults());
      this.store.dispatch(NavbarActions.clearEventsResult());
      }
    })
  }

  toggleNotifications(){
    const state = this.toggleNotificationSub$.value;
    this.toggleNotificationSub$.next(!state);
  }

  private getAvatarName(info: UserProfile): void {
    let firstLetter = info?.firstName[0]?.toUpperCase();
    let secondLetter = info?.lastName[0]?.toUpperCase();
    this.avatarName = firstLetter + secondLetter;
  }
}
