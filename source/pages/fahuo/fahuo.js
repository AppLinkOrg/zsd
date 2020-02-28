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

  }
  test() {
    var that = this;


    this.Base.uploadOneImage("test", (ret) => {
      console.log(ret);
      console.log(ApiConfig.GetUploadPath() + 'test/' + ret);

      var uri = ApiConfig.GetUploadPath() + 'test/' + ret;

      wx.navigateTo({
        url: '/pages/fhshibie/fhshibie?uri=' + uri,
      })

    }, undefined);
  }
  test2() {
    var that = this;
    var imgs = [];

    this.Base.uploadImage("test", (ret, q, seq) => {
      console.log(seq);
      console.log(q);
      console.log(ApiConfig.GetUploadPath() + 'test/' + ret);

      var uri = ApiConfig.GetUploadPath() + 'test/' + ret;

      imgs[seq]=(uri);
      
      if(imgs.length==q){
        that.detail(imgs);
      }
      console.log(imgs)

    }, undefined);
   

  }
  detail(imgs){
 
    
    console.log(imgs,'qqq')
    wx.navigateTo({
        url: '/pages/plshibie/plshibie?imgs=' + JSON.stringify(imgs) ,
      })
  }
  denchu(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.test = content.test;
body.test2 = content.test2;
body.detail = content.detail;
body.denchu = content.denchu;

Page(body)