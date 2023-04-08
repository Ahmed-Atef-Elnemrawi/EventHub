import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { State } from '../state/app.state';
import { UserProfile } from '../user/models';


import { ShapedEntity } from '../artist-home/models';
import { AuthAPIAction } from '../user/state/actions';
import { userSelectors } from '../user/state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() notificationsCount!: number;

  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string>;
  userId$!:Observable<string>;
  isHaveAPage$!: Observable<boolean>;
  userRole$!: Observable<string>;

  avatarName!: string;
  searchForm!: FormGroup;
  searchResult$!: Observable<ShapedEntity[] | null>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<State>, private fb: FormBuilder) {}
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: '',
      searchCategory: 'event',
    });

    this.searchForm.controls['search'].valueChanges
      .pipe(debounceTime(600), takeUntil(this.destroyed$))
      .subscribe(() => this.search());

    this.isAuthenticated$ = this.store.select(userSelectors.getIsAuthenticated);
    this.userName$ = this.store.select(userSelectors.getUserName);
    this.userId$ = this.store.select(userSelectors.getUserId);
    this.isHaveAPage$ = this.store.select(userSelectors.isUserHaveAPage);
    this.userRole$ = this.store.select(userSelectors.getUserRole);

    this.store
      .select(userSelectors.getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((info) => this.getAvatarName(info!));
  }

  logout = () => this.store.dispatch(AuthAPIAction.logout());

  search() {
    var searchField = this.searchForm.get('searchCategory')?.value;
    var searchTerm = this.searchForm.get('search')?.value;

    // if (searchField === 'event' && searchTerm) {
    //   this.store.dispatch(
    //     ArtistEventActions.loadArtistsEvents({
    //       searchTerm,
    //     })
    //   );

    //   this.searchResult$ = this.store.select(eventSearchResult);
    // }

    // if (searchField === 'artist' && searchTerm) {
    //   this.store.dispatch(
    //     ArtistActions.loadArtists({
    //       searchTerm,
    //     })
    //   );

    //   this.searchResult$ = this.store.select(artistSearchResult);
    // }

    // if (searchField === 'event' && searchTerm === '')
    //   this.store.dispatch(ArtistEventActions.clearEventSearchResult());

    // if (searchField === 'artist' && searchTerm === '')
    //   this.store.dispatch(ArtistActions.clearArtistSearchResult());

    // return;
  }

  private getAvatarName(info: UserProfile): void {
    let firstLetter = info?.firstName[0]?.toUpperCase();
    let secondLetter = info?.lastName[0]?.toUpperCase();
    this.avatarName = firstLetter + secondLetter;
  }
}
