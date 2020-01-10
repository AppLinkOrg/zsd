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
import {
  TestApi
} from "../../apis/test.api.js";
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
    var imgs = JSON.parse(this.Base.options.imgs);
    this.getyiji();
    
    var current = 0;
    // var current = this.Base.getMyData().current;
    var arr = [];
    var currentImg = imgs[current];
    var ra = [{
        id: 0,
        name: '是'
      },
      {
        id: 1,
        name: '否'
      },
    ]
    this.Base.setMyData({
      imgs,
      current: current,
      currentImg,
      arr,
      zl: '手动填写',
      tj: '手动填写',
      pl: '手动填写',
      dk: '手动填写',
      bz: '否',
      remark: '请输入备注信息...',
      ordernos: [],
      repnos: [],
      ra,
      watch: false
    })
    // this.Base.setMyData({,imgs})
    
   
  }
  onMyShow() {
    var that = this;

    // var imgs = ["https://alioss.app-link.org/alucard263096/zsd/test…98c76f1ea15eeefd719555_19122617017_2113217248.jpg", "https://alioss.app-link.org/alucard263096/zsd/test…61103ea24588cc7a43d4b6_19122617017_1884148576.jpg", "https://alioss.app-link.org/alucard263096/zsd/test…f1c61b6aba546d3cfd3629_19122617017_1324924670.jpg", "https://alioss.app-link.org/alucard263096/zsd/test…79148cc476eb7c78a675ccb_19122617017_291968097.jpg"];
    // console.log(imgs[0],'imgs'); 
    // var imgs = JSON.parse(this.Base.options.imgs);


  }
  getyiji() {
    var api = new OrderApi;
    var that = this;
    api.yijilist({}, (yijilist) => {
      this.Base.setMyData({
        yijilist
      })
      this.geterji();
    })
  }
  geterji() {
    var currentImg = this.Base.getMyData().currentImg;
    var api = new OrderApi;
    var that = this;
    api.erjilist({}, (erjilist) => {
      this.Base.setMyData({
        erjilist
      })
      this.getinfo();
    })
  }
  getinfo() {
    var yijidizhi = this.Base.getMyData().yijilist;
    var erjidizhi = this.Base.getMyData().erjilist;
    // var uri = this.Base.options.uri;
    //  var uri = 'https://alioss.app-link.org/alucard263096/zsd/test/0e267aec7231bbfbc9c9c2ea8d3107c4_19122614005_1012978076.jpg';
    // console.log(uri);
    var imgs = JSON.parse(this.Base.options.imgs);
    var arr = this.Base.getMyData().arr;
    var zl = this.Base.getMyData().zl;
    var tj = this.Base.getMyData().tj;
    var pl = this.Base.getMyData().pl;
    var dk = this.Base.getMyData().dk;
    var bz = this.Base.getMyData().bz;
    var remark = this.Base.getMyData().remark;
    var api = new TestApi();
    // for(var i=0;i<imgs.length;i++){
    api.test({
      photo: imgs
    }, (res) => {
      console.log(res,'res')
      for(var i=0;i<res.length;i++){

      
      var list = res[i].words_result;
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

          } else {
            dizhi += list[idx + 1].words;
          }
          var reg = /.+?(省|市|自治区|自治州|县|区)/g;

          var dizhilist = dizhi.match(reg);

          dizhi1 = '';
          var dizhi3 = '';
          console.log(dizhilist);
          for (var i = 0; i < dizhilist.length && i < 1; i++) {
            dizhi1 += dizhilist[i];

          }

          for (var i = 0; i < yijidizhi.length; i++) {
            if (dizhi1.indexOf(yijidizhi[i].name) > -1) {
              dizhi1 = yijidizhi[i].name
            }
          }

          for (var i = 0; i < dizhilist.length - 2; i++) {
            dizhi3 += dizhilist[i];

          }

          dizhi2 = dizhi.split(dizhi3)[1];
          for (var i = 0; i < erjidizhi.length; i++) {
            if (dizhi1.indexOf(erjidizhi[i].name) > -1) {
              dizhi2 = erjidizhi[i].name
            }
          }

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

      var json = {
        // imgurl: currentImg,
        danhao: dindanhao,
        housiwei: housiwei,
        yijidizhi: dizhi1,
        erjidizhi: dizhi2,
        shuliang: shulian,
        xingming: name,
        shoujihao: shouji,
        chongliang: zl,
        tiji: tj,
        pinlei: pl,
        daikuan: dk,
        tezhunsong: bz,
        beizhu: remark
      }
      arr.push(json);
      this.Base.setMyData({
        dindanhao: arr[0].danhao,
        housiwei: arr[0].housiwei,
        dizhi1: arr[0].yijidizhi,
        dizhi2: arr[0].erjidizhi,
        name: arr[0].xingming,
        shouji: arr[0].shoujihao,
        shulian: arr[0].shuliang,
      })
    

      console.log(dindanhao);
      console.log(housiwei);
      console.log(dizhi1);
      console.log(dizhi2);
      console.log(shulian);
      console.log(arr, 'arr');
      }
    })
    

  }

  zlFn(e) {
    this.Base.setMyData({
      zl: e.detail.value
    })
  }
  tjFn(e) {
    this.Base.setMyData({
      tj: e.detail.value
    })
  }
  plFn(e) {
    this.Base.setMyData({
      pl: e.detail.value
    })
  }
  dkFn(e) {
    this.Base.setMyData({
      dk: e.detail.value
    })
  }
  bzFn(e) {
    this.Base.setMyData({
      bz: e.detail.value
    })
  }
  reFn(e) {
    this.Base.setMyData({
      remark: e.detail.value
    })
  }
  yicishuju() {
    var arr = this.Base.getMyData().arr;
    var currentImg = this.Base.getMyData().currentImg;
    var dindanhao = this.Base.getMyData().dindanhao;
    var housiwei = this.Base.getMyData().housiwei;
    var dizhi1 = this.Base.getMyData().dizhi1;
    var dizhi2 = this.Base.getMyData().dizhi2;
    var name = this.Base.getMyData().name;
    var shouji = this.Base.getMyData().shouji;
    var shulian = this.Base.getMyData().shulian;
    var zl = this.Base.getMyData().zl;
    var tj = this.Base.getMyData().tj;
    var pl = this.Base.getMyData().pl;
    var dk = this.Base.getMyData().dk;
    var bz = this.Base.getMyData().bz;
    var remark = this.Base.getMyData().remark;
    var current = this.Base.getMyData().current;
    var api = new OrderApi;
    var that = this;
    if (zl == '手动填写') {
      zl = ''
    }
    if (tj == '手动填写') {
      tj = ''
    }
    if (pl == '手动填写') {
      pl = ''
    }
    if (dk == '手动填写') {
      dk = ''
    }
    if (remark == '请输入备注信息...') {
      remark = ''
    }

    var json = {
      // imgurl: currentImg,
      danhao: dindanhao,
      housiwei: housiwei,
      yijidizhi: dizhi1,
      erjidizhi: dizhi2,
      shuliang: shulian,
      xingming: name,
      shoujihao: shouji,
      chongliang: zl,
      tiji: tj,
      pinlei: pl,
      daikuan: dk,
      tezhunsong: bz,
      beizhu: remark
    }
    zl = '';
    tj = '';
    pl = '';
    dk = '';
    bz = '否';
    remark = '';

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].danhao == json.danhao) {
        console.log('考生几个')
        arr[i] = json;

      }
    }
    this.Base.setMyData({
      arr,
      zl: arr[current].chongliang,
      tj: arr[current].tiji,
      pl: arr[current].pinlei,
      dk: arr[current].daikuan,
      bz: arr[current].tezhunsong,
      remark: arr[current].beizhu,
      dindanhao: arr[current].danhao,
      housiwei: arr[current].housiwei,
      dizhi1: arr[current].yijidizhi,
      dizhi2: arr[current].erjidizhi,
      name: arr[current].xingming,
      shouji: arr[current].shoujihao,
      shulian: arr[current].shuliang,
    })
    // arr.push(json);
    console.log(current, arr)


  }

  prePage() {
    var arr = this.Base.getMyData().arr;

    var imgs = this.Base.getMyData().imgs;
    var current = this.Base.getMyData().current;
    var currentImg = this.Base.getMyData().currentImg;
    current = current - 1;
    currentImg = imgs[current];
    this.Base.setMyData({
      current,
      currentImg,
    })
    var json = {};
    this.yicishuju();
    // for(var i=0;i<arr.length;i++){
    //   if(arr[i].imgurl==currentImg){
    //     this.Base.setMyData({
    //       dindanhao: arr[i].danhao, 
    //       housiwei: arr[i].housiwei, 
    //       dizhi1: arr[i].yijidizhi,  
    //       dizhi2: arr[i].erjidizhi,  
    //       name: arr[i].xingming,  
    //       shuliang: arr[i].shuliang,
    //       shouji: arr[i].shoujihao,  
    //       shulian: arr[i].shuliang,  
    //       currentImg: arr[i].imgurl,  
    //       zl: arr[i].chongliang,  
    //       tj: arr[i].tiji,  
    //       pl: arr[i].pinlei,  
    //       dk: arr[i].daikuan,  
    //       bz: arr[i].tezhunsong,  
    //       remark: arr[i].beizhu,  
    //     })
    //   }
    // }
    // this.getinfo(currentImg);
  }
  nexPage() {

    var imgs = this.Base.getMyData().imgs;
    var current = this.Base.getMyData().current;
    var currentImg = this.Base.getMyData().currentImg;
    current = current + 1;
    currentImg = imgs[current];
    this.Base.setMyData({
      current,
      currentImg
    })
    this.goTop();
    this.yicishuju();
    // this.getinfo(currentImg);
  }
  tijiao() {
    this.yicishuju();
    var arr = this.Base.getMyData().arr;
    console.log(arr, 'arr');
    for (var i = 0; i < arr.length; i++) {
      this.add(i, arr[i]);
    }
    var ordernos = this.Base.getMyData().ordernos;
    var repnos = this.Base.getMyData().repnos;
    setTimeout(() => {
      if (ordernos.length > 0) {
        wx.redirectTo({
          url: '/pages/plsuccess/plsuccess?ordernos=' + JSON.stringify(ordernos) + "&repnos=" + JSON.stringify(repnos),
        })
      } else {
        wx.redirectTo({
          url: '/pages/plrepeart/plrepeart?repnos=' + JSON.stringify(repnos),
        })
      }

    }, (arr.length + 1) * 300)

  }
  add(i, json) {
    var api = new OrderApi;
    var ordernos = this.Base.getMyData().ordernos;
    var repnos = this.Base.getMyData().repnos;
    setTimeout(() => {
      api.addfuhuo(json, (ret) => {
        console.log(ret);
        if (ret.code == '0') {
          ordernos.push(json.danhao);
        } else if (ret.code == '-1') {
          repnos.push(json.danhao);
        }
        this.Base.setMyData({
          ordernos,
          repnos
        })
      })
    }, i * 300)
    console.log(ordernos, 'orderno');
    console.log(repnos, 'orderno');
  }

  goTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
  pickerchange(e) {
    console.log(e);
    var yijilist = this.Base.getMyData().yijilist;
    this.Base.setMyData({
      dizhi1: yijilist[e.detail.value].name
    })
  }
  pickerchange2(e) {
    console.log(e);
    var erjilist = this.Base.getMyData().erjilist;
    this.Base.setMyData({
      dizhi2: erjilist[e.detail.value].name
    })
  }
  guang(e) {
    console.log(e)
    var cur = e.currentTarget.dataset.current;
    if (cur == 'zl') {
      this.Base.setMyData({
        zl: ''
      })
    } else if (cur == 'tj') {
      this.Base.setMyData({
        tj: ''
      })
    } else if (cur == 'pl') {
      this.Base.setMyData({
        pl: ''
      })
    } else if (cur == 'dk') {
      this.Base.setMyData({
        dk: ''
      })
    } else if (cur == 'bz') {
      this.Base.setMyData({
        bz: ''
      })
    } else if (cur == 'rr') {
      this.Base.setMyData({
        remark: ''
      })
    }
  }
  shiqu(e) {
    var zl = this.Base.getMyData().zl;
    var tj = this.Base.getMyData().tj;
    var pl = this.Base.getMyData().pl;
    var dk = this.Base.getMyData().dk;
    var bz = this.Base.getMyData().bz;
    var remark = this.Base.getMyData().remark;
    var cur = e.currentTarget.dataset.current;
    if (cur == 'zl' && zl == '') {
      this.Base.setMyData({
        zl: '手动填写'
      })
    } else if (cur == 'tj' && tj == '') {
      this.Base.setMyData({
        tj: '手动填写'
      })
    } else if (cur == 'pl' && pl == '') {
      this.Base.setMyData({
        pl: '手动填写'
      })
    } else if (cur == 'dk' && dk == '') {
      this.Base.setMyData({
        dk: '手动填写'
      })
    } else if (cur == 'bz' && bz == '') {
      this.Base.setMyData({
        bz: '否'
      })
    } else if (cur == 'rr' && remark == '') {
      this.Base.setMyData({
        remark: '请输入备注信息...'
      })
    }
  }
  erjiFn(e) {
    console.log(e);
    // var cur = e.detail.cursor;
    // var dizhi2 = this.Base.getMyData().dizhi2;
    // dizhi2 = dizhi2.slice(cur + 1, dizhi2.length);
    // var dizhii2len = dizhi2.length;
    this.Base.setMyData({ dizhi2: e.detail.value })
  }
  yijiFn(){
    console.log(e);
    this.Base.setMyData({ dizhi1: e.detail.value })
  }
  pickerchange3(e) {
    console.log(e)
    var ra = this.Base.getMyData().ra;
    this.Base.setMyData({
      bz: ra[e.detail.value].name
    })
    // this.Base.setMyData({
    //   bz: e.detail.value
    // })
  }
  viewPhotos(e) {
    this.Base.setMyData({
      watch: true
    })
    var img = e.currentTarget.id;
    console.log(img);
    wx.previewImage({
      urls: [img],
    })
    this.Base.setMyData({
      watch: false
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.getinfo = content.getinfo;
body.zlFn = content.zlFn;
body.tjFn = content.tjFn;
body.plFn = content.plFn;
body.dkFn = content.dkFn;
body.bzFn = content.bzFn;
body.reFn = content.reFn;
body.yicishuju = content.yicishuju;
body.prePage = content.prePage;
body.nexPage = content.nexPage;
body.tijiao = content.tijiao;
body.add = content.add;
body.goTop = content.goTop;
body.getyiji = content.getyiji;
body.geterji = content.geterji;
body.pickerchange = content.pickerchange;
body.pickerchange2 = content.pickerchange2;
body.guang = content.guang;
body.shiqu = content.shiqu;
body.erjiFn = content.erjiFn; 
body.yijiFn = content.yijiFn; 
body.pickerchange3 = content.pickerchange3;
body.viewPhotos = content.viewPhotos;

Page(body)