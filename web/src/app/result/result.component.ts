import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
  ) { 
    super(router,activeRoute,instApi);
  }
  chong;
  dizhi;
  chen;
  onMyLoad(){
    this.params;
    this.chong= JSON.parse(this.params.chong);
    this.dizhi= JSON.parse(this.params.dizhi);
    this.chen= JSON.parse(this.params.chen);
    console.log(this.chong,this.dizhi)
  }
  onMyShow(){

  }


}
