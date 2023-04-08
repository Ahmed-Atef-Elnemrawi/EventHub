import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map,Observable,  } from 'rxjs';
import { ArtistEventAPIActions } from 'src/app/artist-home/state/actions';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-events-i-attend',
  templateUrl: './events-i-attend.component.html',
  styleUrls: ['./events-i-attend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsIAttendComponent implements OnInit {
  userData$!: Observable<any>;
  constructor(private store:Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userData$ = this.route.data.pipe(map((data) => data['userData']));
  }

  backOut(artistId:string, eventId:string, attendantId:string){
    this.store.dispatch(ArtistEventAPIActions.DeleteArtistEventAttendant({
      artistId,
      eventId,
      attendantId
    }))
  }
}
