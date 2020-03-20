import { Component, OnInit, } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { ApiConfig } from '../api.config';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-shibie',
  templateUrl: './shibie.component.html',
  styleUrls: ['./shibie.component.scss'],
  providers:[]
})
export class ShibieComponent extends AppBase {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    private sanitizer:DomSanitizer, 

  ) { 
    super(router,activeRoute,instApi);
    // this.test = {};
    this.options = { concurrency: 1, maxUploads: 99 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  onMyShow(){
  
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(222222222222,output)
    switch (output.type) {
      case 'allAddedToQueue':
        this.startUpload();
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'done':
        // The file is downloaded
        console.log(output,'3333333');
        var res = output.file.response.split("|");
        //success|~~|6c1ba761b75d631fb9c8507df5a9dfda_19082919048_1578887646.jpg
        if (res[0] == "success") {
          this.photo = res[2];
          this.navigate('/detail',{url:res[2]})
        }
        break;
    }

    console.log(this.test,'5555')
  }

  onUploadOutput2(output: UploadOutput): void {
    console.log(222222222222,output)
    switch (output.type) {
      case 'allAddedToQueue':
        this.startUpload();
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'done':
        // The file is downloaded
        console.log(output,'3333333');
        var res = output.file.response.split("|");
        //success|~~|6c1ba761b75d631fb9c8507df5a9dfda_19082919048_1578887646.jpg
        if (res[0] == "success") {
          var url = ApiConfig.getUploadPath() + 'test/'+res[2];
          this.imgs.push(url);
          console.log(this.imgs,'imgs');
          if(this.files.length==this.imgs.length){
            this.navigate('/moredetail',{url:this.imgs}  )
          }
        }
        break;
    }

    console.log(this.test,'5555')
  }
  imgs=[];
  photo;
  test=null;
  startUpload(): void {
    console.log(111111111111)
    const event: UploadInput = {
      type: 'uploadAll',
      url: ApiConfig.getFileUploadAPI(),
      method: 'POST',
      data: { field: 'file', module: "test" }
    };
    console.log(this.files)
    this.uploadInput.emit(event);
  }
 


}
