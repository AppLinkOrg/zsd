import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { ShibieComponent } from './shibie/shibie.component';
import { DetailComponent } from './detail/detail.component';
import { MoredetailComponent } from './moredetail/moredetail.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  { path: '', component: ShibieComponent },
  { path: 'shibie', component: ShibieComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'moredetail', component: MoredetailComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
