import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/shared.service';

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
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.homeData$ = this.route.data.pipe(map((data) => data['HomeData']));
    this.toggleNotifications$ = this.sharedService.toggleNotifications$;
  }
}
