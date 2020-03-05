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
        console.log(res);
        console.log(res.result)
        var index = res.result.indexOf('-');
        if (index > -1) {
          var code = res.result.slice(0, index);
        } else {
          var code = res.result;
        }
        console.log(index, 'index', code);
        if (that.checkno(code, weilanhuo)) {
          api.yilanhuo({ danhao:code}, (ret) => {
            if (ret.code == '0') {
              wx.navigateTo({
                url: '/pages/lhsuccess/lhsuccess?barcode=' + code + "&chong=false" + "&cheng=true" + "&dui=false"
              })
            }
          })
        }else {
          if (that.checklanhuo(code, yilanhuo)){
            wx.navigateTo({
              url: '/pages/lhrepeart/lhrepeart?barcode=' + code + "&chong=true" + "&cheng=false" + "&dui=false"
            })
          }else {
            api.lanhuotijiao({ danhao: code }, (ret) => {
              if (ret.code == '0') {
                wx.navigateTo({
                  url: '/pages/lhtijiao/lhtijiao?barcode=' + code + "&chong=false" + "&cheng=false" + "&dui=true"
                })
              }
            })
          }
           
          
        }

      },
      fail(res) {
        console.log('fail', res);
        wx.showToast({
          title: '此单无法识别！！',
          icon: 'none'
        })
        return
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
    wx.navigateTo({
      url: '/pages/weilanhuo/weilanhuo',
    })
  }
  denchu() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
  rengong(){
    wx.navigateTo({
      url: '/pages/lhrengong/lhrengong',
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
body.rengong = content.rengong;

Page(body)