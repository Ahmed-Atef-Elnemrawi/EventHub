import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ArtistAPIActions } from 'src/app/artist-home/state/actions';
import { LoadingService } from 'src/app/shared/loading/loading.service';

import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-who-im-follow',
  templateUrl: './who-im-follow.component.html',
  styleUrls: ['./who-im-follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhoImFollowComponent implements OnInit {
  userData$!: Observable<any>;
  isLoadingState$!: Observable<boolean>;

  constructor(private store: Store<State>,private route:ActivatedRoute, private loaderService:LoadingService ) {}

  ngOnInit(): void {
    this.isLoadingState$ = this.loaderService.isWhoImFollowLoaded$.asObservable();
     this.userData$ = this.route.data.pipe(map(data => data['userData']))
  }

  unfollow(artistId: string, userId: string) {
    this.store.dispatch(
      ArtistAPIActions.DeleteArtistFollower({
        artistId,
        followerId: userId,
      })
    );

  }
}
