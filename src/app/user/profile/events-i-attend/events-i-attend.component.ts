import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map,Observable,  } from 'rxjs';
import { ArtistEventAPIActions } from 'src/app/artist-home/state/actions';
import { State } from 'src/app/state/app.state';
import { UserAPIActions } from '../../state/actions';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-events-i-attend',
  templateUrl: './events-i-attend.component.html',
  styleUrls: ['./events-i-attend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsIAttendComponent implements OnInit {
  userData$!: Observable<any>;
  isLoadingData$!: Observable<boolean>;
  constructor(private store:Store<State>, private route: ActivatedRoute, private loadingService:LoadingService) {}

  ngOnInit(): void {
    this.isLoadingData$ = this.loadingService.isEventsIAttendLoaded$.asObservable();
    this.userData$ = this.route.data.pipe(map((data) => data['userData']));
  }

  backOut(artistId:string, eventId:string, userId:string){
    this.store.dispatch(UserAPIActions.unAttendEvent({
      artistId,
      eventId,
      userId
    }))
  }
}
