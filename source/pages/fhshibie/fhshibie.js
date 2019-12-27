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
    this.getinfo();
  }
  getinfo() {
    var uri = this.Base.options.uri;
    //  var uri = 'https://alioss.app-link.org/alucard263096/zsd/test/0e267aec7231bbfbc9c9c2ea8d3107c4_19122614005_1012978076.jpg';
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
          for (var i = 0; i < dizhilist.length && i < 1; i++) {
            dizhi1 += dizhilist[i];

          }


          dizhi2 = dizhi.split(dizhi1)[1];


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
        wx.navigateTo({
          url: '/pages/fhsuccess/fhsuccess?diandan=' + dindanhao + '&fhsb=' + 'A',
        })
      } else if (ret.code == '-1') {
        wx.navigateTo({
          url: '/pages/fhrepeart/fhrepeart?diandan=' + dindanhao,
        })
      }
    })
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

Page(body)