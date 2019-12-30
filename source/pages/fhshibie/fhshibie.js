// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  TestApi
} from "../../apis/test.api.js";
import {
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      zl: '手动填写', tj: '手动填写', pl: '手动填写', dk: '手动填写', bz: '手动填写', remark:'请输入备注信息...'
    })
   
    this.getyiji();
    this.geterji();
    
  }
  getyiji(){
    var api = new OrderApi;
    var that = this;
    api.yijilist({}, (yijilist)=>{
      this.Base.setMyData({ yijilist})
    })
  }
  geterji(){
    var api = new OrderApi;
    var that = this;
    api.erjilist({}, (erjilist) => {
      this.Base.setMyData({ erjilist })
      this.getinfo();
    })
  }
  getinfo() {
    var yijidizhi = this.Base.getMyData().yijilist;
    var erjidizhi = this.Base.getMyData().erjilist;
    var uri = this.Base.options.uri;
    // var uri = 'https://alioss.app-link.org/alucard263096/zsd/test/a93f4b00e1f133e3d02ebcafd9846c15_19122715022_705000340.jpg';
    console.log(uri);
    var api = new TestApi();
    api.test({
      photo: uri
    }, (res) => {
      var list = res.words_result;
      console.log(list);
      var dindanhao;
      var housiwei;
      var dizhi;
      var dizhi1;
      var dizhi2;
      var shulian;
      var name;
      var shouji;
      list.map((item, idx) => {

        if (item.words.indexOf("订单号:") != -1) {

          dindanhao = item.words.split('订单号:')[1];
          housiwei = dindanhao.substring(dindanhao.length - 4);


        }
        if (item.words.indexOf("地址:") != -1) {
          dizhi = item.words.split('地址:')[1];

          if (list[idx + 1].words.indexOf("*请核对以上信息,") != -1) {

          } else {
            dizhi += list[idx + 1].words;
          }
          var reg = /.+?(省|市|自治区|自治州|县|区)/g;

          var dizhilist = dizhi.match(reg);

          dizhi1 = '';
          var dizhi3 = '';
          for (var i = 0; i < dizhilist.length && i < 1; i++) {
            dizhi1 += dizhilist[i];

          }
          for (var i = 0; i < yijidizhi.length;i++){
            if (dizhi1.indexOf(yijidizhi[i].name)>-1) {
              dizhi1 = yijidizhi[i].name
            }
          }
          
          for (var i = 0; i < dizhilist.length - 1; i++) {
            dizhi3 += dizhilist[i];

          }

          dizhi2 = dizhi.split(dizhi3)[1];


        }
        if (item.words.indexOf("数量:") != -1) {

          shulian = item.words.split('数量:')[1];


          console.log(shulian);

        }
        if (item.words.indexOf("姓名:") != -1) {

          name = item.words.split('姓名:')[1];


          console.log(name);

        }

        if (item.words.indexOf("电话:") != -1) {

          shouji = item.words.split('电话:')[1];


          console.log(shouji);

        }



      })
      this.Base.setMyData({
        dindanhao,
        housiwei,
        dizhi1,
        dizhi2,
        name,
        shouji,
        shulian,
        uri
      })
      console.log(dindanhao);
      console.log(housiwei);
      console.log(dizhi1);
      console.log(dizhi2);
      console.log(shulian);

    })
  }
  zlFn(e) {
    this.Base.setMyData({
      zl: e.detail.value
    })
  }
  tjFn(e) {
    this.Base.setMyData({
      tj: e.detail.value
    })
  }
  plFn(e) {
    this.Base.setMyData({
      pl: e.detail.value
    })
  }
  dkFn(e) {
    this.Base.setMyData({
      dk: e.detail.value
    })
  }
  bzFn(e) {
    this.Base.setMyData({
      bz: e.detail.value
    })
  }
  reFn(e) {
    this.Base.setMyData({
      remark: e.detail.value
    })
  }
  tijiao() {
    var dindanhao = this.Base.getMyData().dindanhao;
    var housiwei = this.Base.getMyData().housiwei;
    var dizhi1 = this.Base.getMyData().dizhi1;
    var dizhi2 = this.Base.getMyData().dizhi2;
    var name = this.Base.getMyData().name;
    var shouji = this.Base.getMyData().shouji;
    var shulian = this.Base.getMyData().shulian;
    var zl = this.Base.getMyData().zl;
    var tj = this.Base.getMyData().tj;
    var pl = this.Base.getMyData().pl;
    var dk = this.Base.getMyData().dk;
    var bz = this.Base.getMyData().bz;
    var remark = this.Base.getMyData().remark;
    var api = new OrderApi;
    var that = this;
    if (zl =='手动填写'){
      zl='';
    }
    if (tj == '手动填写') {
      tj = '';
    }
    if (pl == '手动填写') {
      pl = '';
    }
    if (dk == '手动填写') {
      dk = '';
    }
    if (bz == '手动填写') {
      bz = '';
    }
    if (remark == '请输入备注信息...') {
      remark = '';
    }
    var json = {
      danhao: dindanhao,
      housiwei: housiwei,
      yijidizhi: dizhi1,
      erjidizhi: dizhi2,
      shuliang: shulian,
      xingming: name,
      shoujihao: shouji,
      chongliang: zl,
      tiji: tj,
      pinlei: pl,
      daikuan: dk,
      tezhunsong: bz,
      beizhu: remark
    }
    api.addfuhuo(json, (ret) => {
      console.log(ret);
      if (ret.code == '0') {
        wx.redirectTo({
          url: '/pages/fhsuccess/fhsuccess?diandan=' + dindanhao + '&fhsb=' + 'A',
        })
      } else if (ret.code == '-1') {
        wx.redirectTo({
          url: '/pages/fhrepeart/fhrepeart?diandan=' + dindanhao,
        })
      }
    })
  }
  pickerchange(e){
    console.log(e);
    var yijilist = this.Base.getMyData().yijilist;
    this.Base.setMyData({
      dizhi1: yijilist[e.detail.value].name
    })
  }
  pickerchange2(e){
    console.log(e);
    var erjilist = this.Base.getMyData().erjilist;
    this.Base.setMyData({
      dizhi2: erjilist[e.detail.value].name
    })
  }
  gaunga(e){
    this.Base.setMyData({
      zl:''
    })
  }
  gaungb(e) {
    this.Base.setMyData({
      tj: ''
    })
  }
  gaungc(e) {
    this.Base.setMyData({
      pl: ''
    })
  }
  gaungd(e) {
    this.Base.setMyData({
      dk: ''
    })
  }
  gaunge(e) {
    this.Base.setMyData({
      bz: ''
    })
  }
  gaungf(e) {
    this.Base.setMyData({
      remark: ''
    })
  }
  shia(){
    var zl = this.Base.getMyData().zl;
    if(zl==''){
      zl='手动填写';
    }
    this.Base.setMyData({zl})
  }
  shib() {
    var tj = this.Base.getMyData().tj;
    if (tj == '') {
      tj = '手动填写';
    }
    this.Base.setMyData({ tj })
  }
  shic() {
    var pl = this.Base.getMyData().pl;
    if (pl == '') {
      pl = '手动填写';
    }
    this.Base.setMyData({ pl })
  }
  shid() {
    var dk = this.Base.getMyData().dk;
    if (dk == '') {
      dk = '手动填写';
    }
    this.Base.setMyData({ dk })
  }
  shie() {
    var bz = this.Base.getMyData().bz;
    if (bz == '') {
      bz = '手动填写';
    }
    this.Base.setMyData({ bz })
  }
  shif() {
    var remark = this.Base.getMyData().remark;
    if (remark == '') {
      remark = '请输入备注信息...';
    }
    this.Base.setMyData({ remark })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.zlFn = content.zlFn;
body.tjFn = content.tjFn;
body.plFn = content.plFn;
body.dkFn = content.dkFn;
body.bzFn = content.bzFn;
body.reFn = content.reFn;
body.tijiao = content.tijiao;
body.getyiji = content.getyiji;
body.geterji = content.geterji;
body.pickerchange = content.pickerchange;
body.pickerchange2 = content.pickerchange2;
body.gaungb = content.gaungb;
body.gaunga = content.gaunga;
body.gaungc = content.gaungc;
body.gaungd = content.gaungd;
body.gaunge = content.gaunge;
body.gaungf = content.gaungf;
body.shia = content.shia;
body.shib = content.shib;
body.shic = content.shic;
body.shid = content.shid;
body.shie = content.shie;
body.shif = content.shif;


Page(body)