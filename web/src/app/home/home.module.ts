import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUploaderModule } from 'ngx-uploader';
import { ShibieComponent } from '../shibie/shibie.component';
@NgModule({
  declarations: [
    HomeComponent,
    ShibieComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxUploaderModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class HomeModule { }
