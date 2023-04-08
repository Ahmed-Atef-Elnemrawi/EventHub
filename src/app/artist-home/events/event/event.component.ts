import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShapedEntity } from '../../models';
import { getCurrentEvent } from '../../state';
import { State } from '../../state/reducers/root.reducer';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  eventId!: string;
  currentEvent$!: Observable<ShapedEntity | null>;
  constructor(
    private store: Store<State>,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.currentEvent$ = this.store.select(getCurrentEvent(this.eventId));
  }

  back() {
    this.location.back();
  }
}
