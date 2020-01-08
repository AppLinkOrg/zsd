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
    this.getinfo();
    this.getinfos();
  }

  getinfo() {
    var arr = [];
    var api = new OrderApi;
    var that = this;
    var item = JSON.parse(this.Base.options.item);
    api.fuhuolist({ dingdanzhuangtai: 'A' }, (fuhuolist) => {
      console.log(fuhuolist, 'fuhuolist');
      if (fuhuolist.length > 0) {
        for (var i = 0; i < fuhuolist.length; i++) {
          if (item.chehao == fuhuolist[i].chehao) {
              arr.push(fuhuolist[i]);
          }

        }
        this.Base.setMyData({ fuhuolist, arr ,item})
      }

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
  jixu(e) {
    var fuhuolist = this.Base.getMyData().fuhuolist;
    var weijiaodui = this.Base.getMyData().weijiaodui;
    var yijiaodui = this.Base.getMyData().yijiaodui;
    var that = this;
    var api = new OrderApi;
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result)
        var index = res.result.indexOf('-');
        var code = res.result.slice(0, index);
        console.log(index, 'index', code);
        if (that.checkno(code, weijiaodui)) {
          console.log('111111')
          api.jiaodui({
            danhao: code
          }, (ret) => {
            if (ret.code == '0') {
              wx.redirectTo({
                url: '/pages/jddetails/jddetails?barcode=' + code
              })
            }
          })

        } else {
          if (that.checkyijiaodui(code, yijiaodui)) {
            console.log('2222222')
            wx.redirectTo({
              url: '/pages/jdrepeart/jdrepeart?barcode=' + code
            })
          } else {
            console.log('333333')
            // api.addjiaodui({
            //   danhao: code, dingdanzhuangtai: 'C'
            // }, (ret) => {
            //   if (ret.code == '0') {
                wx.redirectTo({
                  url: '/pages/jdtijiao/jdtijiao?barcode=' + code
                })
            //   }
            // })

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

  checkyijiaodui(code, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      }
    }
    return false
  }

  getinfos() {
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

body.getinfo = content.getinfo;
body.fanhui = content.fanhui;
body.getinfos = content.getinfos;
body.checkno = content.checkno;
body.checkyijiaodui = content.checkyijiaodui;
body.jixu = content.jixu;

Page(body)