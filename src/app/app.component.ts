import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UTIN';
  blur:number=15;
  Gap:number=-20;
  showProgressBar: boolean = false;
  LOGOSIZE:number=180;
  TextSize:number=0;
}
