import { Component, ViewChildren } from '@angular/core';
import { SlideInfoService } from './services/slide-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren("slideItem") slideItems: any;

  constructor(private slideInfo: SlideInfoService) { }

  ngAfterViewInit(): void {
    this.slideInfo.slideItems = this.slideItems;
  }

}
