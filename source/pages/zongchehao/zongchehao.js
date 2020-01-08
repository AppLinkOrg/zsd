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

  getinfo() {
    var arr = [];
    var api = new OrderApi;
    var that = this;
    var item = JSON.parse(this.Base.options.item);
    api.fuhuolist({ dingdanzhuangtai: 'A' }, (fuhuolist) => {
      console.log(fuhuolist, 'fuhuolist');
      if (fuhuolist.length > 0) {
        // arr.push(fuhuolist[0]);
        for (var i = 0; i < fuhuolist.length; i++) {
          if (item.fahuoshijian_timespan == fuhuolist[i].fahuoshijian_timespan){
            if (that.checkcar(fuhuolist[i], arr)) {
              arr.push(fuhuolist[i]);
            }
          }
          
        }
        this.Base.setMyData({ fuhuolist, arr,item })
      }

    })
  }

  checkcar(item, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (item.chehao == arr[i].chehao) {
        return false
      }
    }
    return true
  }
  detail(e) {
    wx.navigateTo({
      url: '/pages/zongdanhao/zongdanhao?item=' + JSON.stringify(e.currentTarget.dataset.current),
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.checkcar = content.checkcar;
body.detail = content.detail;

Page(body)