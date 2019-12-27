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
    this.Base.setMyData({
      diandan
    })
  }
  fanhui() {
    var memberinfo = this.Base.getMyData().memberinfo;
    if (memberinfo.juese == 'A') {
      wx.navigateTo({
        url: '/pages/fahuo/fahuo',
      })
    } else if (memberinfo.juese == 'B') {
      wx.navigateTo({
        url: '/pages/jiaodui/jiaodui',
      })
    } else if (memberinfo.juese == 'C') {
      wx.navigateTo({
        url: '/pages/lanhuo/lanhuo',
      })
    }
  }
  jixu() {

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
body.jixu = content.jixu;

Page(body)