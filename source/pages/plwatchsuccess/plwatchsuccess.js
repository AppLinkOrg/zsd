// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

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
    var ordernos = JSON.parse(this.Base.options.ordernos);

    this.Base.setMyData({
      ordernos
    })
  }
  fanhui() {
    var memberinfo = this.Base.getMyData().memberinfo;
    if (memberinfo.juese == 'A') {
      wx.redirectTo({
        url: '/pages/fahuo/fahuo',
      })
    } else if (memberinfo.juese == 'B') {
      wx.redirectTo({
        url: '/pages/jiaodui/jiaodui',
      })
    } else if (memberinfo.juese == 'C') {
      wx.redirectTo({
        url: '/pages/lanhuo/lanhuo',
      })
    }
  }
  jixu() {
    var that = this;
    var imgs = [];

    this.Base.uploadImage("test", (ret, q) => {
      console.log(q);
      console.log(ApiConfig.GetUploadPath() + 'test/' + ret);

      var uri = ApiConfig.GetUploadPath() + 'test/' + ret;

      imgs.push(uri);

      if (imgs.length == q.length) {
        that.detail(imgs);
      }

    }, undefined);


  }
  detail(imgs) {


    console.log(imgs, 'qqq')
    wx.redirectTo({
      url: '/pages/plshibie/plshibie?imgs=' + JSON.stringify(imgs),
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
body.jixu = content.jixu;
body.detail = content.detail;
body.watch = content.watch;

Page(body)