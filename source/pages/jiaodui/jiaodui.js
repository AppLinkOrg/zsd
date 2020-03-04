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
    // this.getinfo();
    console.log('一次一次')
  }
  bindtodetail(e) {
    // var fuhuolist = this.Base.getMyData().fuhuolist;
    // var weijiaodui = this.Base.getMyData().weijiaodui;
    // var yijiaodui = this.Base.getMyData().yijiaodui;
    var that = this;
    var api = new OrderApi;
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result)
        var index = res.result.indexOf('-');
        if (index > -1) {
          var code = res.result.slice(0, index);
        } else {
          var code = res.result;
        }
        console.log(index,'index',code);

        api.fuhuolist({ danhao: code }, (fuhuolist) => {
          console.log(fuhuolist, fuhuolist.length)
          if (fuhuolist.length > 0) {
            if (fuhuolist[0].dingdanzhuangtai == 'A') {
              api.jiaodui({ danhao: code }, (ret) => {
                if (ret.code == '0') {
                  wx.navigateTo({
                    url: '/pages/jddetails/jddetails?barcode=' + code + "&dui=true" +  "&wu=false" + "&chong=false"
                  })
                }
              })
            } else {
              wx.navigateTo({
                url: '/pages/jdrepeart/jdrepeart?barcode=' + code + "&chong=true" +  "&dui=false" +"&wu=false"
              })
            }
          } else {
            wx.navigateTo({
              url: '/pages/jdtijiao/jdtijiao?barcode=' + code + "&wu=true" + "&chong=false" + "&dui=false"
            })
          }

        })
        // if (that.checkno(code, weijiaodui)){
        //   api.jiaodui({ danhao:code},(ret)=>{
        //     if(ret.code=='0'){
        //       wx.navigateTo({
        //         url: '/pages/jddetails/jddetails?barcode=' + code
        //       })
        //     }
        //   })
        // }else {
        //   if (that.checkyijiaodui(code, yijiaodui)){
        //     wx.navigateTo({
        //       url: '/pages/jdrepeart/jdrepeart?barcode=' + code 
        //     })
        //   }else {
        //     // api.addjiaodui({ danhao: code, dingdanzhuangtai:'C'},(ret)=>{
        //     //   if(ret.code=='0'){
        //         wx.navigateTo({
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

  checkno(code, arr){
    for (var i = 0; i < arr.length; i++) {
      if (code == arr[i].danhao) {
        return true
      } 
    }
    return false
  }

  checkyijiaodui(code, arr){
    for (var i = 0; i < arr.length; i++) {
      if (code==arr[i].danhao) {
        return true
      }
    }
    return false
  }

  getinfo(){
    var api = new OrderApi;
    var that = this;
    api.fuhuolist({}, (fuhuolist)=>{
      console.log(fuhuolist);
      var weijiaodui = [];
      var yijiaodui = [];
      for (var i = 0; i < fuhuolist.length; i++) {
        if (fuhuolist[i].dingdanzhuangtai=='A') {
          weijiaodui.push(fuhuolist[i]);
        } else {
          yijiaodui.push(fuhuolist[i])
        }
      }
      that.Base.setMyData({
        fuhuolist, weijiaodui, yijiaodui
      })
    })
  }
  rengong(){
    wx.navigateTo({
      url: '/pages/rengong/rengong',
    })
  }
  denchu() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
  zong(){
    wx.navigateTo({
      url: '/pages/rengong/rengong',
    })
  }
  zongjiaodui(){
    wx.navigateTo({
      url: '/pages/zongjiaodui/zongjiaodui',
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
body.checkyijiaodui = content.checkyijiaodui;
body.rengong = content.rengong;
body.denchu = content.denchu;
body.zong = content.zong;
body.zongjiaodui = content.zongjiaodui;

Page(body)