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
    this.getriqi();
  }
 
  getinfo(){
    var arr = [];
    var api = new OrderApi;
    var that = this;
    api.fuhuolist({ dingdanzhuangtai: 'A' }, (fuhuolist)=>{
      console.log(fuhuolist,'fuhuolist');
      if (fuhuolist.length>0){
        arr.push(fuhuolist[0]);
        for (var i = 0; i < fuhuolist.length; i++) {
          if (that.checkcar(fuhuolist[i], arr)){
            arr.push(fuhuolist[i])
          }
        }
        this.Base.setMyData({ fuhuolist,arr })
      }
      
    })
  }
  getriqi(){
    console.log(this.getDay(0));
    console.log(this.getDay(-15));

    var riqi= [];
    var api = new OrderApi;
    var that = this;
    api.fuhuolist({ dingdanzhuangtai: 'A', orderby:'r_main.fahuoshijian desc' }, (fuhuolist) => {
      console.log(fuhuolist, 'fuhuolist');
      if (fuhuolist.length > 0) {
        riqi.push(fuhuolist[0]);
        for (var i = 0; i < fuhuolist.length; i++) {
          if (fuhuolist[i].fahuoshijian_formatting>that.getDay(-15)){
            if (that.checktime(fuhuolist[i], riqi)) {
              riqi.push(fuhuolist[i])
            }
          }
          
        }
        this.Base.setMyData({ fuhuolist, riqi })
      }

    })
  }

 getDay(day) {

  　　var today = new Date();



  　　var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;



  　　today.setTime(targetday_milliseconds); //注意，这行是关键代码



  　　var tYear = today.getFullYear();

  　　var tMonth = today.getMonth();

  　　var tDate = today.getDate();

  　　tMonth = this.doHandleMonth(tMonth + 1);

  　　tDate = this.doHandleMonth(tDate);

  　　return tYear + "-" + tMonth + "-" + tDate;

}

doHandleMonth(month) {

  　　var m = month;

  　　if (month.toString().length == 1) {

    　　　　m = "0" + month;

  　　}

  　　return m;

}
  checktime(item,arr){
    for (var i = 0; i < arr.length; i++) {
      if (item.fahuoshijian == arr[i].fahuoshijian) {
        return false
      }
    }
    return true
  }
  checkcar(item,arr){
    for(var i=0;i<arr.length;i++){
      if (item.chehao == arr[i].chehao){
        return false
      }
    }
    return true
  }
  detail(e){
    wx.navigateTo({
      url: '/pages/zongchehao/zongchehao?item=' + JSON.stringify(e.currentTarget.dataset.current),
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.checkcar = content.checkcar;
body.getriqi = content.getriqi;
body.checktime = content.checktime;
body.detail = content.detail;
body.getDay = content.getDay;
body.doHandleMonth = content.doHandleMonth;

Page(body)