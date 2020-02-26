import { Component, OnInit } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private slideInfo: SlideInfoService) { }

  ngOnInit() {
    this.slideInfo.setCurrentSlide(1);
  }

}
