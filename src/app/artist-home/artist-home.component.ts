import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { State } from '../state/app.state';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistHomeComponent implements OnInit {
  actualArtistId!: string;
  routeArtistId!: string;
  artistHomeData$!: Observable<any>;
  userId!: string | null;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (p) => (this.routeArtistId = p.get('artistId')!)
    );

    this.actualArtistId = localStorage.getItem('entityId')!;
    this.userId = localStorage.getItem('userId');
    this.artistHomeData$ = this.route.data.pipe(
      map((data) => data['ArtistHomeData'])
    );
  }
}
