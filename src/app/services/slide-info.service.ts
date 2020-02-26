import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideInfoService {
  public slideItems: any;

  private clearCurrentSlide(items): void {
    let elementLength = items._results.length;
    for (let i = 0; i < elementLength; i++) {
      items._results[i].nativeElement
           .classList.remove("current-item");
    }
  }

  public setCurrentSlide(num): void {
    this.clearCurrentSlide(this.slideItems);
    let currentItem = this.slideItems._results[num].nativeElement;
    currentItem.classList.add("current-item");
  }
  
  constructor() { }
}
