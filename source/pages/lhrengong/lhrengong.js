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

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '人工揽收',
    })
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
  dianFn(e) {
    this.Base.setMyData({
      dianhao: e.detail.value
    })
  }
  tijiao() {
    var dianhao = this.Base.getMyData().dianhao;
    var weilanhuo = this.Base.getMyData().weilanhuo;
    var yilanhuo = this.Base.getMyData().yilanhuo;
    var api = new OrderApi;
    if (this.checkno(dianhao, weilanhuo)) {
      api.yilanhuo({
        danhao: dianhao
      }, (ret) => {
        if (ret.code == '0') {
          wx.redirectTo({
            url: '/pages/lhsuccess/lhsuccess?barcode=' + dianhao
          })
        }
      })
    } else {
      if (this.checklanhuo(dianhao, yilanhuo)) {
        wx.redirectTo({
          url: '/pages/lhrepeart/lhrepeart?barcode=' + dianhao
        })
      } else {
        api.lanhuotijiao({
          danhao: dianhao
        }, (ret) => {
          if (ret.code == '0') {
            wx.redirectTo({
              url: '/pages/lhtijiao/lhtijiao?barcode=' + dianhao
            })
          }
        })
      }
    }
  }

  checkno(code, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }
  checklanhuo(code, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.dianFn = content.dianFn;
body.tijiao = content.tijiao;
body.checklanhuo = content.checklanhuo;
body.checkno = content.checkno;

Page(body)