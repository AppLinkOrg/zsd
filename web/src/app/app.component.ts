import { Component } from '@angular/core';
import { InstApi } from 'src/providers/inst.api';
import { AppBase } from './AppBase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers:[InstApi]
})
export class AppComponent {
  title = 'seatmap';

  constructor(public instApi:InstApi){
    
  }
}
