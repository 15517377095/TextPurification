import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideInfoService {
  public slideItems: any;

  // 清除当前项样式
  private clearCurrentSlide(items): void {
    let elementLength = items._results.length;
    for (let i = 0; i < elementLength; i++) {
      items._results[i].nativeElement
           .classList.remove("current-item");
    }
  }

  // 设置当前项目为第 num 项
  public setCurrentSlide(num): void {
    this.clearCurrentSlide(this.slideItems);
    let currentItem = this.slideItems._results[num].nativeElement;
    currentItem.classList.add("current-item");
  }
  
  constructor() { }
}
