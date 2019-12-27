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
    var cont = [
      { id: 1, name: '未返还' },
      { id: 2, name: '强制校对' },
      { id: 3, name: '删除此条' },
    ];
    
    this.Base.setMyData({
      cont, names:''
    })
  }
  pickerchange(e){
    var cont = this.Base.getMyData().cont;
    console.log(e);
    this.Base.setMyData({
      names: cont[e.detail.value].name
    })
  }
  dianFn(e){
    this.Base.setMyData({
      dianhao:e.detail.value
    })
  }
  tijiao(){
    var names = this.Base.getMyData().names;
    var dianhao = this.Base.getMyData().dianhao;
    console.log(names,dianhao);
    var api = new OrderApi;
    api.addjiaodui({ danhao: dianhao, dingdanzhuangtai:'D'},(ret)=>{
      if(ret.code=='0'){
        wx.navigateTo({
          url: '/pages/rengongsuccess/rengongsuccess?diandan=' + dianhao +'&xuanze='+names,
        })
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.pickerchange = content.pickerchange;
body.tijiao = content.tijiao;
body.dianFn = content.dianFn;

Page(body)