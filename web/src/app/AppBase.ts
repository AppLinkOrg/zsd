import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { InstApi } from "../providers/inst.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit,AfterViewInit } from '@angular/core';


declare let Wechat: any;

export class AppBase implements OnInit {
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal=false;

    //public devicename="";

    public static devicename="";

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static Current:AppBase=null;
    public static myapp: AppComponent = null;
    public static UNICODE = "zsd";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name:"" };


    public options = null;
    public params: Params = null;


     

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }


    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi:InstApi
        ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];

    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {
        this.bfscrolltop = document.body.scrollTop;
        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();
    }
    onMyLoad() {
    }
    getInstInfo() {
        
        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo:any) => {
                AppBase.StaticInstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
        }
    }
    getMemberInfo() {
        
    }
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit(){
        this.onMyShow();
    }

    onMyShow() {

    }
    
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    
    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    
}