import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../services/Home.service';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.scss']
})
export class HomeSidenavComponent implements AfterViewInit, OnInit {
@Input() UserId!: string | null;
  constructor(private HomeService : HomeService) { }
  ngAfterViewInit(): void {

    $(function () {
      $('#btn1').on('click', function () {
        $('#btn2').removeClass('active');
        $(this).addClass('active');
      });

      $('#btn2').on('click', function () {
        $('#btn1').removeClass('active');
        $(this).addClass('active');
      });
    });

  }

  ngOnInit(): void {
  }

  navToSection(name:string){
    this.HomeService.navToPagePart(name);
  }
}
