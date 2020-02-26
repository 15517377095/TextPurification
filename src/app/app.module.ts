import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { AboutComponent } from './component/about/about.component';
import { SlideInfoService } from './services/slide-info.service';
import { RegComponent } from './component/reg/reg.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    SlideInfoService
  ],
  bootstrap: [
    AppComponent
 ]
})
export class AppModule { }
