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
  bindtodetail(e) {
    var weilanhuo = this.Base.getMyData().weilanhuo;
    var yilanhuo = this.Base.getMyData().yilanhuo;
    var api = new OrderApi;
    var that = this;
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result)
        var index = res.result.indexOf('-');
        var code = res.result.slice(0, index);
        console.log(index, 'index', code);
        if (that.checkno(code, weilanhuo)) {
          api.yilanhuo({ danhao:code}, (ret) => {
            if (ret.code == '0') {
              wx.redirectTo({
                url: '/pages/lhsuccess/lhsuccess?barcode=' + code
              })
            }
          })
        }else {
          if (that.checklanhuo(code, yilanhuo)){
            wx.redirectTo({
              url: '/pages/lhrepeart/lhrepeart?barcode=' + code
            })
          }else {
            api.lanhuotijiao({ danhao: code }, (ret) => {
              if (ret.code == '0') {
                wx.redirectTo({
                  url: '/pages/lhtijiao/lhtijiao?barcode=' + code
                })
              }
            })
          }
           
          
        }

      }

    })
  }
  checkno(code, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }
  checklanhuo(code,arr){
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }
  getinfo() {
    var api = new OrderApi;
    var weilanhuo = [];
    var yilanhuo = [];
    api.lanhuolist({}, (lanhuolist) => {
      for (var i = 0; i < lanhuolist.length; i++) {
        if (lanhuolist[i].dingdanzhuangtai == 'A') {
          weilanhuo.push(lanhuolist[i]);
        } else {
          yilanhuo.push(lanhuolist[i]);
        }
      }
      this.Base.setMyData({
        weilanhuo,
        yilanhuo,
        lanhuolist
      })
    })
  }
  zong(){
    wx.redirectTo({
      url: '/pages/weilanhuo/weilanhuo',
    })
  }
  denchu() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindtodetail = content.bindtodetail;
body.getinfo = content.getinfo;
body.checkno = content.checkno;
body.checklanhuo = content.checklanhuo;
body.zong = content.zong;
body.denchu = content.denchu;

Page(body)