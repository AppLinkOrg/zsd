import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { DomSanitizer } from '@angular/platform-browser';
import { TestApi } from 'src/providers/test.api'
import { OrderApi } from 'src/providers/order.api'
@Component({
  selector: 'app-moredetail',
  templateUrl: './moredetail.component.html',
  styleUrls: ['./moredetail.component.scss'],
  providers:[TestApi,OrderApi]
})
export class MoredetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public testApi: TestApi,
    public orderApi: OrderApi,
    private sanitizer: DomSanitizer
  ) { 
    super(router,activeRoute,instApi);
  }
  current=0;
  imgs;
  currentimg;
  onMyLoad(){
    this.params;
    this.imgs=this.params.url;
    this.currentimg=this.imgs[this.current];
  }
  arr=[];

  jiaoyixvhao;
  housiwei;
  dizhibianma;
  chuhuozongliang;
  zhekouhoujine;

  onMyShow(){

    this.testApi.test({ photo: this.imgs }).then((res:any) => {
      console.log(res,res.length);
      for(var i=0;i<res.length;i++){
      var list = res[i].words_result;
      console.log(list);
      var jiaoyixvhao1='';
      var housiwei1='';
      var dizhibianma1='';
      var chuhuozongliang1='';
      var zhekouhoujine1='';
      list.map((item, idx) => {
        if (item.words.indexOf("交易序号:") != -1) {
           
          jiaoyixvhao1 = item.words.split('交易序号:')[1];
          if(jiaoyixvhao1.indexOf('站点电话:')>-1){
            var index=jiaoyixvhao1.indexOf('站点电话:');
            jiaoyixvhao1=jiaoyixvhao1.slice(0,index);

          }
          housiwei1 = jiaoyixvhao1.substring(jiaoyixvhao1.length - 4);
          console.log(jiaoyixvhao1,'xuhao')
        }
        

        if (item.words.indexOf("站点编码:") != -1) {
         dizhibianma1 = item.words.split('站点编码:')[1];
        }


        if (item.words.indexOf("出货总量:") != -1) {
          chuhuozongliang1 = item.words.split('出货总量:')[1];
        }


        if (item.words.indexOf("折扣后金额:") != -1) {
          zhekouhoujine1 = item.words.split('折扣后金额:')[1];
        }
       
        
      })
      var json = {
        jiaoyixvhao:jiaoyixvhao1,
        housiwei:housiwei1,
        dizhibianma:dizhibianma1,
        chuhuozongliang:chuhuozongliang1,
        zhekouhoujine:zhekouhoujine1
      }
  
      this.arr.push(json);
          
     
      console.log(this.arr);
      if(this.arr.length>0){
        this.jiaoyixvhao=this.arr[0].jiaoyixvhao;
        this.housiwei=this.arr[0].housiwei;
        this.dizhibianma=this.arr[0].dizhibianma;
        this.chuhuozongliang=this.arr[0].chuhuozongliang;
        this.zhekouhoujine=this.arr[0].zhekouhoujine;
      }
    }
    })


   
  } 
  checkre(json){
    
    for(let item of this.arr){
      if(item.jiaoyixvhao==json.jiaoyixvhao){
        return false
      }
    }
    return true
  }
  checkkong(json){
    for(var key in json){
      if(json[key]=='' ||json[key]==undefined){
        return false
      }
    }
    return true
  }

  prePage(){

    this.arr[this.current].chuhuozongliang = this.chuhuozongliang;
    this.arr[this.current].jiaoyixvhao = this.jiaoyixvhao;
    this.arr[this.current].housiwei = this.housiwei;
    this.arr[this.current].dizhibianma = this.dizhibianma;
    this.arr[this.current].zhekouhoujine = this.zhekouhoujine;

    if(this.current>0){
      this.current--;
    }else {
      this.current=0;
    }
    this.currentimg=this.imgs[this.current];
    this.jiaoyixvhao=this.arr[this.current].jiaoyixvhao;
    this.housiwei=this.arr[this.current].housiwei;
    this.dizhibianma=this.arr[this.current].dizhibianma;
    this.chuhuozongliang=this.arr[this.current].chuhuozongliang;
    this.zhekouhoujine=this.arr[this.current].zhekouhoujine;
  }
  nexPage(){

    this.arr[this.current].chuhuozongliang = this.chuhuozongliang;
    this.arr[this.current].jiaoyixvhao = this.jiaoyixvhao;
    this.arr[this.current].housiwei = this.housiwei;
    this.arr[this.current].dizhibianma = this.dizhibianma;
    this.arr[this.current].zhekouhoujine = this.zhekouhoujine;


    if(this.current<this.imgs.length){
      this.current++;
    }else {
      this.current=this.imgs.length-1;
    }
    console.log(this.chuhuozongliang)

    
    this.currentimg=this.imgs[this.current];
    this.jiaoyixvhao=this.arr[this.current].jiaoyixvhao;
    this.housiwei=this.arr[this.current].housiwei;
    this.dizhibianma=this.arr[this.current].dizhibianma;
    this.chuhuozongliang=this.arr[this.current].chuhuozongliang;
    this.zhekouhoujine=this.arr[this.current].zhekouhoujine;
  }
  success='A';
  tijiao(){
    console.log(this.arr);
    for(var i=0;i<this.arr.length;i++){
     this.add(this.arr[i],this.arr.length,i)
    }
  }
  chong=[];
  dizhi=[];
  chen=[];
  add(json,len,i){
    setTimeout(() => {
      this.orderApi.addhuodanshuju({
        jiaoyixvhao:json.jiaoyixvhao,
        housiwei:json.housiwei,
        dizhibianma:json.dizhibianma,
        chuhuozongliang:json.chuhuozongliang,
        zhekouhoujine:json.zhekouhoujine,
      }).then((addhuodanshuju:any) => {
        console.log(addhuodanshuju);
          if(addhuodanshuju.code=='0'){
            this.success='B';
            this.chen.push(json.jiaoyixvhao);
          }else if(addhuodanshuju.code=='-1'){
            this.success='B'
            if(addhuodanshuju.result.indexOf('交易序号')>-1){
              this.chong.push(json.jiaoyixvhao);
            }else if(addhuodanshuju.result.indexOf('地址编码')>-1) {
              this.dizhi.push(json.jiaoyixvhao);
            }
          }
         
      })
    }, i*300);
    
    setTimeout(() => {
      var re = JSON.stringify(this.chong);
      var re2 = JSON.stringify(this.dizhi);
      var re3 = JSON.stringify(this.chen);
     this.navigate('/result',{chong:re,dizhi:re2,chen:re3})

   }, 5000);
  }
}
