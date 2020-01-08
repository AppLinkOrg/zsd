// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { MemberApi } from "../../apis/member.api.js";

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
    console.log(this.Base.getMyData().memberinfo,'mm');
    // var jusenames  = this.Base.getMyData().memberinfo.juesename;
    var fa = false;
    var jd = false;
    var ls = false;
    var memberapi = new MemberApi;
    var jusenames = this.Base.getMyData().memberinfo.juese.split(',');
    console.log(jusenames, 'juesename');
    var arr=[];
    for (var i = 0; i < jusenames.length; i++) {
      memberapi.yuangong({ id: jusenames[i] }, (yuangong) => {
        // arr.push(yuangong.name)
        if (yuangong.name == '发货员') {
          console.log(2222)
          fa = true;
        }
        if (yuangong.name == '校对员') {
          jd = true;
        }
        if (yuangong.name == '揽收员') {
          ls = true;
        }
        this.Base.setMyData({ fa, jd, ls })
      })
      
    }

   
  }
  detail(e){
    console.log(e);
    var name = e.currentTarget.id;
    var memberinfo = this.Base.getMyData().memberinfo;
    memberinfo.juese_name = name
    this.Base.setMyData({
      memberinfo
    })
    if (name=='发货员') {
      wx.redirectTo({
        url: '/pages/fahuo/fahuo',
      })
    } else if (name == '校对员') {
      wx.redirectTo({
        url: '/pages/jiaodui/jiaodui',
      })
    } else if (name == '揽收员') {
      wx.redirectTo({
        url: '/pages/lanhuo/lanhuo',
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.detail = content.detail;

Page(body)