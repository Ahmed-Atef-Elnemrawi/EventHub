import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { UserProfile } from 'src/app/user/models';
import { AttendantForCreationDto, ShapedEntity } from '../models';
import { loadArtistEvents, deleteArtistEvent } from '../state/actions/artist-api-actions';
import { createArtistEventAttendant } from '../state/actions/artist-event-api-actions';
import { State } from '../state/reducers/root.reducer';

@Component({
  selector: 'app-artist-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() CurrentArtistEvents!: ShapedEntity[] | null;
  @Input() CurrentUserProfile!: UserProfile | null;
  @Input() PagingMetaData!: any;
  @Input() CurrentUserRole!: string | null;
  @Input() ActualUserId!:string | null;
  @Input() ActualArtistId!:string | null;
  @Input() RouteArtistId!:string | null ;



  constructor(private store: Store<State>) {}


  ngOnInit(): void {
  }

  sortBy(sortTerm: string): void {
    this.store.dispatch(
      loadArtistEvents({ artistId: this.RouteArtistId!, sortBy: `${sortTerm}` })
    );
  }

  filterBy(filterTem: string): void {
    this.store.dispatch(
      loadArtistEvents({ artistId: this.RouteArtistId!, filterBy: `${filterTem}` })
    );
  }

  handlePagination(event: PageEvent) {
    this.store.dispatch(
      loadArtistEvents({
        artistId: this.RouteArtistId!,
        pageNumber: event.pageIndex + 1,
        pageSize: event.pageSize,
      })
    );
  }

  attend(eventId:string){
    let attendant = {
      attendantId:this.ActualUserId,
      firstName:this.CurrentUserProfile?.firstName,
      lastName:this.CurrentUserProfile?.lastName,
      genre: this.CurrentUserProfile?.genre,
      email:this.CurrentUserProfile?.email,
      age:this.CurrentUserProfile?.age,
      city:this.CurrentUserProfile?.liveIn,
      phoneNumber:this.CurrentUserProfile?.phoneNumber,


    }as AttendantForCreationDto

    this.store.dispatch(createArtistEventAttendant({
      artistId:this.RouteArtistId!,
      eventId,
      attendant
    }))
  }

  delete(eventId: string) {
    if (confirm('You are about to delete this event, are you sure?')) {
      this.store.dispatch(
        deleteArtistEvent({ artistId: this.RouteArtistId!, eventId })
      );
    }
  }
}
