// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { TestApi } from "../../apis/test.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ test: '', s: "0", c: "3" })
  }
  onMyShow() {
    var that = this;
  }
  test() {
    var that = this;

    var api = new TestApi();
    this.Base.uploadImage("test", (ret) => {
      console.log(ret);
      console.log(ApiConfig.GetUploadPath() + 'test/' + ret);

      var uri = ApiConfig.GetUploadPath() + 'test/' + ret;

      api.test({ photo: uri }, (res) => {
        var list = res.words_result;
        console.log(list);
        var dindanhao;
        var housiwei;
        var dizhi;
        var dizhi1;
        var dizhi2;
        var shulian;
        var name;
        var shouji;
        list.map((item, idx) => {

          if (item.words.indexOf("订单号:") != -1) {

            dindanhao = item.words.split('订单号:')[1];
            housiwei = dindanhao.substring(dindanhao.length - 4);


          }
          if (item.words.indexOf("地址:") != -1) {
            dizhi = item.words.split('地址:')[1];

            if (list[idx + 1].words.indexOf("*请核对以上信息,") != -1) {

            }
            else {
              dizhi += list[idx + 1].words;
            }
            var reg = /.+?(省|市|自治区|自治州|县|区)/g;

            var dizhilist = dizhi.match(reg);

            dizhi1 = '';
            for (var i = 0; i < dizhilist.length&&i<1; i++) {
              dizhi1 += dizhilist[i];

            }


            dizhi2 = dizhi.split(dizhi1)[1];


          }
          if (item.words.indexOf("数量:") != -1) {

            shulian = item.words.split('数量:')[1];


            console.log(shulian);

          }
          if (item.words.indexOf("姓名:") != -1) {

            name = item.words.split('姓名:')[1];


            console.log(name);

          }

          if (item.words.indexOf("电话:") != -1) {

            shouji = item.words.split('电话:')[1];


            console.log(shouji);

          }



        })
        this.Base.setMyData({ dindanhao, housiwei, dizhi1, dizhi2, name, shouji, shulian, test: 1 })
        console.log(dindanhao);
        console.log(housiwei);
        console.log(dizhi1);
        console.log(dizhi2);
        console.log(shulian);

      })


    }, undefined);




  }
  qwe(e) {
    console.log(e);
  }
  asd(e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }
    console.log(left);
    console.log(pos);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.test = content.test;
body.qwe = content.qwe;
body.asd = content.asd;
Page(body)