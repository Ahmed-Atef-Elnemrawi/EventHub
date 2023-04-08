import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserProfile } from 'src/app/user/models';
import { FollowerForCreationDto } from '../models';
import { ArtistAPIActions } from '../state/actions';
import { State } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-artist-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewInit {
  @Input() CurrentUserRole!: string | null;
  @Input() CurrentArtist!: any;
  @Input() RouteArtistId!: string | null;
  @Input() ActualUserId!: string | null;
  @Input() ActualArtistId!: string | null;
  @Input() CurrentUserProfile!: UserProfile | null;
  @Input() IsUserFollowsArtist!: boolean | null;
  @Input() ArtistFollowersCount!:number | null

  constructor(private store: Store<State>) {}

  ngAfterViewInit(): void {
    let moreBtn = document.querySelector('#more');
    let moreInfo = document.querySelector('#more-info');

    moreBtn?.addEventListener('click', function () {
      moreInfo?.classList.remove('hide');
      moreBtn?.classList.add('hide');
    });
  }

  ngOnInit(): void {

  }

  follow() {
    let follower = {
      followerId: this.ActualUserId,
      firstName: this.CurrentUserProfile?.firstName,
      lastName: this.CurrentUserProfile?.lastName,
      age: this.CurrentUserProfile?.age,
      email: this.CurrentUserProfile?.email,
      phoneNumber: this.CurrentUserProfile?.phoneNumber,
      genre: this.CurrentUserProfile?.genre,
      liveIn: this.CurrentUserProfile?.liveIn,
    } as FollowerForCreationDto;

    this.store.dispatch(
      ArtistAPIActions.createArtistFollower({
        artistId: this.RouteArtistId!,
        follower,
      })
    );
  }

  unfollow() {
    this.store.dispatch(
      ArtistAPIActions.DeleteArtistFollower({
        artistId: this.RouteArtistId!,
        followerId: this.ActualUserId!,
      })
    );
  }
}
