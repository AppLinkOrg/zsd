// pages/details/details.js
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
   
    // this.Base.setMyData({ show:0})
  }
  onMyShow() {
    var that = this;
    this.Base.setMyData({
      wu: this.Base.options.wu,
      chong: this.Base.options.chong,
      dui: this.Base.options.dui,
      barcode: this.Base.options.barcode
    })
    // this.getinfo();
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

  jixu(e) {
    // var fuhuolist = this.Base.getMyData().fuhuolist;
    // var weijiaodui = this.Base.getMyData().weijiaodui;
    // var yijiaodui = this.Base.getMyData().yijiaodui;
    var that = this;
    var api = new OrderApi;
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result);
        console.log(res);
        var index = res.result.indexOf('-');
        if (index > -1) {
          var code = res.result.slice(0, index);
        } else {
          var code = res.result;
        }

        console.log(index, 'index', code);

        api.fuhuolist({ danhao: code }, (fuhuolist) => {
          if (fuhuolist.length > 0) {
            if (fuhuolist[0].dingdanzhuangtai == 'A') {
              api.jiaodui({ danhao: code }, (ret) => {
                if (ret.code == '0') {
                  that.Base.options.barcode = code;
                  that.Base.options.wu = "false";
                  that.Base.options.chong = "false";
                  that.Base.options.dui = "true";
                  that.onMyShow();
                  // wx.navigateTo({
                  //   url: '/pages/jddetails/jddetails?barcode=' + code
                  // })
                }
              })
            } else {
              // wx.navigateTo({
              //   url: '/pages/jdrepeart/jdrepeart?barcode=' + code
              // })
              that.Base.options.barcode = code;
              that.Base.options.wu = "false";
              that.Base.options.chong = "true";
              that.Base.options.dui = "false";
              that.onMyShow();

            }
          } else {
            // wx.navigateTo({
            //   url: '/pages/jdtijiao/jdtijiao?barcode=' + code
            // })

            that.Base.options.barcode = code;
            that.Base.options.wu = "true";
            that.Base.options.chong = "false";
            that.Base.options.dui = "false";
            that.onMyShow();
          }

        })


        // if (that.checkno(code, weijiaodui)) {
        //   api.jiaodui({
        //     danhao: code
        //   }, (ret) => {
        //     if (ret.code == '0') {
        //       wx.redirectTo({
        //         url: '/pages/jddetails/jddetails?barcode=' + code
        //       })
        //     }
        //   })

        // } else {
        //   if (that.checkyijiaodui(code, yijiaodui)) {
        //     wx.redirectTo({
        //       url: '/pages/jdrepeart/jdrepeart?barcode=' + code
        //     })
        //   } else {
        //     // api.addjiaodui({
        //     //   danhao: code, dingdanzhuangtai: 'C'
        //     // }, (ret) => {
        //     //   if (ret.code == '0') {
        //         wx.redirectTo({
        //           url: '/pages/jdtijiao/jdtijiao?barcode=' + code
        //         })
        //     //   }
        //     // })

        //   }
        // }

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

  checkyijiaodui(code, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }

  getinfo() {
    var api = new OrderApi;
    var that = this;
    api.fuhuolist({}, (fuhuolist) => {
      console.log(fuhuolist);
      var weijiaodui = [];
      var yijiaodui = [];
      for (var i = 0; i < fuhuolist.length; i++) {
        if (fuhuolist[i].dingdanzhuangtai == 'A') {
          weijiaodui.push(fuhuolist[i]);
        } else {
          yijiaodui.push(fuhuolist[i])
        }
      }
      that.Base.setMyData({
        fuhuolist,
        weijiaodui,
        yijiaodui
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
body.checkno = content.checkno;
body.checkyijiaodui = content.checkyijiaodui;
Page(body)