import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { RegComponent } from './component/reg/reg.component';
import { AboutComponent } from './component/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'reg',
    component: RegComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
