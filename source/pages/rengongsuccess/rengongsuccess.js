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
    var diandan = this.Base.options.diandan;
    var xuanze = this.Base.options.xuanze;
    this.Base.setMyData({
      diandan, xuanze
    })
  }
  fanhui() {
    var memberinfo = this.Base.getMyData().memberinfo;
    // if (memberinfo.juese == 'A') {
    //   wx.redirectTo({
    //     url: '/pages/fahuo/fahuo',
    //   })
    // } else if (memberinfo.juese == 'B') {
      wx.redirectTo({
        url: '/pages/jiaodui/jiaodui',
      })
    // } else if (memberinfo.juese == 'C') {
    //   wx.redirectTo({
    //     url: '/pages/lanhuo/lanhuo',
    //   })
    // }
  }
  jixu() {
    wx.redirectTo({
      url: '/pages/rengong/rengong',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
body.jixu = content.jixu;

Page(body)