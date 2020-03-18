import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiConfig } from '../api.config';
import { TestApi } from 'src/providers/test.api'
import { OrderApi } from 'src/providers/order.api'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [TestApi, OrderApi]
})
export class DetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public testApi: TestApi,
    public orderApi: OrderApi,
    private sanitizer: DomSanitizer
  ) {

    super(router, activeRoute, instApi);

  }

  url;
  jiaoyixvhao;
  housiwei;
  dizhibianma;
  name;
  dianhua;
  dizhi;
  chuhuozongliang;
  zhekouhoujine;

  onMyLoad() {
    this.params;
    this.url = ApiConfig.getUploadPath() + 'test/' + this.params.url;
  }
success='A';
  onMyShow() {


    console.log(this.housiwei,'图片');
    this.testApi.test({ photo: this.url }).then((res) => {
      console.log(res);
      var list = res[0].words_result;
      console.log(list);
      list.map((item, idx) => {
        if (item.words.indexOf("交易序号:") != -1) {

          this.jiaoyixvhao = item.words.split('交易序号:')[1];
          this.housiwei = this.jiaoyixvhao.substring(this.jiaoyixvhao.length - 4);

        }

        if (item.words.indexOf("站点编码:") != -1) {
          this.dizhibianma = item.words.split('站点编码:')[1];
        }


        if (item.words.indexOf("出货总量:") != -1) {
          this.chuhuozongliang = item.words.split('出货总量:')[1];
        }


        if (item.words.indexOf("折扣后金额:") != -1) {
          this.zhekouhoujine = item.words.split('折扣后金额:')[1];
        }

      })

    })



  }
  tijiao() {
    this.orderApi.addhuodanshuju({
      jiaoyixvhao:this.jiaoyixvhao,
      housiwei:this.housiwei,
      dizhibianma:this.dizhibianma,
      chuhuozongliang:this.chuhuozongliang,
      zhekouhoujine:this.zhekouhoujine,
    }).then((addhuodanshuju:any) => {
      console.log(addhuodanshuju);
        if(addhuodanshuju.code=='0'){
          this.success='B';
        }else if(addhuodanshuju.code=='-1'){
          this.success='C'
        }
       setTimeout(() => {
          window.history.go(-1);
       }, 3000);
    })
  }

}
