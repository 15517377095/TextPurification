import { Component, OnInit } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private slideInfo: SlideInfoService) { }

  ngOnInit() {
    this.slideInfo.setCurrentSlide(0);
  }

}
