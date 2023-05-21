import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { AttendantForCreationDto, ShapedEntity } from '../../models';
import { getCurrentEvent } from '../../state';
import { State } from '../../state/reducers/root.reducer';
import { ArtistEventAPIActions } from '../../state/actions';
import { getUserId, getUserProfile } from 'src/app/user/state/selectors/user.selectors';
import { UserProfile } from 'src/app/user/models';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  artistId!: string;
  eventId!: string;
  currentEvent$!: Observable<ShapedEntity | null>;
  userProfile$!: Observable<UserProfile | null>;
  userId$!: Observable<string | null>;
  userInfo$!:Observable<any>;
  actualArtistId!: string;
  currentDate = new Date().toLocaleDateString();
  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.actualArtistId = localStorage.getItem("entityId")!;
    this.artistId = this.route.snapshot.parent?.paramMap.get('artistId')!;
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.currentEvent$ = this.store.select(getCurrentEvent(this.eventId));
    this.userProfile$ = this.store.select(getUserProfile);
    this.userId$ = this.store.select(getUserId);

    this.userInfo$ = combineLatest([this.userProfile$, this.userId$])
    .pipe(map(([user, userId]) => ({user, userId})))
  }

  attend(eventId:string, user:UserProfile, userId:string){

    let attendant = {
      attendantId:userId,
      firstName:user?.firstName,
      lastName:user?.lastName,
      genre: user?.genre,
      email:user?.email,
      age:user?.age,
      city:user.liveIn,
      phoneNumber:user?.phoneNumber,
    }as AttendantForCreationDto


    this.store.dispatch(ArtistEventAPIActions.createArtistEventAttendant({
     artistId:this.artistId,
     eventId,
     attendant
    }))
  }

 navToArtistHome(){
  this.router.navigateByUrl(`/artists/${this.artistId}`)
 }

  backToHome() {
    this.router.navigateByUrl('/')
  }
}
