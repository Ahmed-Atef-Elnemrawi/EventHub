import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { observable, Observable, Subject, takeUntil } from 'rxjs';
import { State } from '../state/state';
import { UserProfile } from '../user/models';
import { getIsAuthenticated, getUserName, getUserProfile } from '../user/state';
import { UserApiActions } from '../user/state/actions';

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
  avatarName!: string;
  searchForm!: FormGroup;
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

    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
    this.userName$ = this.store.select(getUserName);

    this.store
      .select(getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((info) => this.getAvatarName(info));
  }


  logout = () => this.store.dispatch(UserApiActions.logout());

  //TODO: select user Image

  search() {
    var category = this.searchForm.get('searchCategory')?.value;
    var searchTerm = this.searchForm.get('search')?.value;
    //TODO: dispatch getEvent(searchTerm)
    if (category === 'event')
    if (category === 'Org')
    //TODO: dispatch getOrg(searchTerm)
    //TODO: dispatch getArtist(SearchTerm)

    null;
  }



  private getAvatarName(info: UserProfile): void {
    let firstLetter = info.firstName[0]?.toUpperCase();
    let secondLetter = info.lastName[0]?.toUpperCase();
    this.avatarName = firstLetter + secondLetter;
  }
}
