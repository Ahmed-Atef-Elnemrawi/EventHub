import { Component, Input, OnInit } from '@angular/core';
import { ShapedEntity } from '../models';


@Component({
  selector: 'app-coming-event',
  templateUrl: './coming-event.component.html',
  styleUrls: ['./coming-event.component.scss']
})
export class ComingEventComponent implements OnInit {
  @Input()CurrentDayEvents!:ShapedEntity[] | null;


  constructor() {}

  ngOnInit(): void {
  }

}
