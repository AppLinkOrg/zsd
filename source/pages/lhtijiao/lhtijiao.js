// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

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
      diandan: this.Base.options.barcode,
      cheng: this.Base.options.cheng,
      dui: this.Base.options.dui,
      chong: this.Base.options.chong
    })
    this.getinfo();
  }
  fanhui() {
    var memberinfo = this.Base.getMyData().memberinfo;
    // if (memberinfo.juese == 'A') {
    //   wx.redirectTo({
    //     url: '/pages/fahuo/fahuo',
    //   })
    // } else if (memberinfo.juese == 'B') {
    //   wx.redirectTo({
    //     url: '/pages/jiaodui/jiaodui',
    //   })
    // } else if (memberinfo.juese == 'C') {
      wx.redirectTo({
        url: '/pages/lanhuo/lanhuo',
      })
    // }
  }

  jixu(e) {
    var weilanhuo = this.Base.getMyData().weilanhuo;
    var yilanhuo = this.Base.getMyData().yilanhuo;
    var api = new OrderApi;
    var that = this;
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result)
        console.log(res.result)
        var index = res.result.indexOf('-');
        if (index > -1) {
          var code = res.result.slice(0, index);
        } else {
          var code = res.result;
        }

        console.log(index, 'index', code);
        if (that.checkno(code, weilanhuo)) {
          api.yilanhuo({ danhao: code }, (ret) => {
            if (ret.code == '0') {
              // wx.redirectTo({
              //   url: '/pages/lhsuccess/lhsuccess?barcode=' + code
              // })

              that.Base.options.barcode = code;
              that.Base.options.cheng = "true";
              that.Base.options.dui = "false";
              that.Base.options.chong = 'false';
              that.onMyShow();
            }
          })
        } else {
          if (that.checklanhuo(code, yilanhuo)) {
            // wx.redirectTo({
            //   url: '/pages/lhrepeart/lhrepeart?barcode=' + code
            // })
            that.Base.options.barcode = code;
            that.Base.options.cheng = "false";
            that.Base.options.dui = "false";
            that.Base.options.chong = 'true';
            that.onMyShow();
          } else {
            api.lanhuotijiao({ danhao: code }, (ret) => {
              if (ret.code == '0') {
                // wx.redirectTo({
                //   url: '/pages/lhtijiao/lhtijiao?barcode=' + code
                // })
                that.Base.options.barcode = code;
                that.Base.options.cheng = "false";
                that.Base.options.dui = "true";
                that.Base.options.chong = 'false';
                that.onMyShow();
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
  checklanhuo(code, arr) {
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

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.fanhui = content.fanhui;
body.jixu = content.jixu;
body.getinfo = content.getinfo;
body.checklanhuo = content.checklanhuo;
body.checkno = content.checkno;

Page(body)