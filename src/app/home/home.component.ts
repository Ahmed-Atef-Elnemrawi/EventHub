import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeData$!: Observable<any>;
  Artists$!: Observable<any>;
  toggleNotifications$!: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.homeData$ = this.route.data.pipe(map((data) => data['HomeData']));
  }
}
