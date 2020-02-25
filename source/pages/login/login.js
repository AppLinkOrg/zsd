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
    var loginname = wx.getStorageSync("loginname");
    var loginpwd = wx.getStorageSync("loginpwd");
    console.log(loginname, loginpwd,'uuu');
    if(loginname==''){
      this.Base.setMyData({
        pp:true,
        name: '请输入用户名或者手机号码',
        password: '请输入密码'
      })
    }else {
      this.Base.setMyData({
        pp: false,
        name: loginname,
        password: loginpwd
      })
    }
   
  }
  onMyShow() {
    var that = this;
    console.log(123);
    console.log(this.Base.options.onhide);
    var onHide = this.Base.options.onhide;
    if (onHide == 'onHide') {
      wx.showToast({
        title: '被挤退了！',
        icon: 'none'
      })
      return 
    }
    // if(this.Base.logname!=""){
    // //  var name=this.Base.logname;
    // //   var password=this.Base.loginpwd;
    //   this.Base.setMyData({
    //     name: this.Base.logname,
    //     password: this.Base.loginpwd
    //     })
    // }else {
    //   this.Base.setMyData({
    //     name: '',
    //     password:''
    //   })
    // }
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
    this.Base.logname = name;
    this.Base.loginpwd = password;

    console.log(this.Base.logname)
    console.log(this.Base.loginpwd)
    api.login({
      name: name,
      password: password
    }, (ret) => {
      console.log(ret);
      if (ret.code == '0') {
        wx.setStorageSync("token", ret.return);
        wx.setStorageSync("loginname", name);
        wx.setStorageSync("loginpwd",password);
        that.Base.needauth = true;
        if (ret.result == 1) {
          wx.redirectTo({
            url: '/pages/fahuo/fahuo',
          })
        } else if (ret.result == 2){
          wx.redirectTo({
            url: '/pages/jiaodui/jiaodui',
          })
        } else if (ret.result == 3) {
          wx.redirectTo({
            url: '/pages/lanhuo/lanhuo',
          })
        }else {
          wx.redirectTo({
            url: '/pages/xaunzeyuangong/xaunzeyuangong',
          })
        }

      }else {
        wx.showToast({
          title: '用户名或者密码错误，请重新输入',
          icon: 'none'
        })
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