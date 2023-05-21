import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Observable, map, tap } from 'rxjs';
import { ShapedEntity } from 'src/app/user/models';
import { State } from '../state/reducers/home.reducer';
import { Store } from '@ngrx/store';
import { HomeAPIActions } from '../state/actions';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { HomeService } from '../services/Home.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent implements OnInit, OnInit {
  @Input() Artists!: ShapedEntity[] | null;
  @Input() Events!: ShapedEntity[] | null;
  isEventsLoadedState$!: Observable<boolean>;
  isArtistsLoadedState$!: Observable<boolean>;
  sectionName$!: Observable<string>;
  userId!: string;

  constructor(
    private store: Store<State>,
    private loadingService: LoadingService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {

    this.userId = localStorage.getItem("userId")!;
    this.homeService.pagePartName$
      .asObservable()
      .subscribe((id) => this.scrollIntoView(id));

    this.isEventsLoadedState$ = this.loadingService.isEventsLoaded$.asObservable();
    this.isArtistsLoadedState$ = this.loadingService.isArtistsLoaded$.asObservable();
  }

  scrollIntoView(id: string) {
    $('html, main').animate(
      {
        scrollTop:
          $('#' + id).offset()?.top! + (id === 'artists-section' ? -300 : +300),
      },
      600
    );
  }

  loadMoreArtists() {
    this.store.dispatch(HomeAPIActions.loadMoreArtists({ incrementBy: 1 }));
  }

  loadMoreEvents() {
    this.store.dispatch(HomeAPIActions.loadMoreEvents({ incrementBy: 1 }));
  }
}
