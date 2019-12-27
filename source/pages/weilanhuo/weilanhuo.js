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
  }
  getinfo(){
    var api = new OrderApi;
    var riqi = [];
    var that = this;
    api.lanhuolist({ dingdanzhuangtai: 'A' }, (lanhuolist)=>{
      console.log(lanhuolist);
      riqi.push(lanhuolist[0])
      for (var i = 1; i < lanhuolist.length;i++){
        if (that.checkre(lanhuolist[i],riqi)){
          riqi.push(lanhuolist[i]);
        }
      }
      this.Base.setMyData({ lanhuolist, riqi});
    })
  }
  checkre(item,arr){
    for(var i=0;i<arr.length;i++){
      if (item.daorushijian_timespan == arr[i].daorushijian_timespan){
        return false
      }
    }
    return true
  }
  detail(e){
    console.log(e)
    var item = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/weilanhuodetail/weilanhuodetail?item=' + JSON.stringify(item) ,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.checkre = content.checkre;
body.detail = content.detail;

Page(body)