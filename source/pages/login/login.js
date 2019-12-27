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
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
  }
  onMyShow() {
    var that = this;
  }
  nameFn(e) {
    console.log(e);
    this.Base.setMyData({
      name: e.detail.value
    })
  }
  pwdFn(e) {
    this.Base.setMyData({
      password: e.detail.value
    })
  }
  
  login() {
    var name = this.Base.getMyData().name;
    var password = this.Base.getMyData().password;
    console.log(name, password);
    var api = new MemberApi;
    var that = this;
    api.login({
      name: name,
      password: password
    }, (ret) => {
      console.log(ret);
      if (ret.code == '0') {
        wx.setStorageSync("token", ret.return);
        that.Base.needauth = true;
        if (ret.result == 'A') {
          wx.redirectTo({
            url: '/pages/fahuo/fahuo',
          })
        } else if (ret.result == 'B'){
          wx.redirectTo({
            url: '/pages/jiaodui/jiaodui',
          })
        } else if (ret.result == 'C') {
          wx.redirectTo({
            url: '/pages/lanhuo/lanhuo',
          })
        }

      }
    })
  }
  lianxi(){
    var instinfo = this.Base.getMyData().instinfo;
    console.log(instinfo);
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: instinfo.customerservicemobile
          })
        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.nameFn = content.nameFn;
body.pwdFn = content.pwdFn;
body.login = content.login;
body.lianxi = content.lianxi;
Page(body)