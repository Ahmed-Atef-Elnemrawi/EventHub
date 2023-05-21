import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  template: `


      <div class="loader--ripple">
        <div></div>
        <div></div>
      </div>
    

  `,
  styleUrls:['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}
}
