import { Component, ViewChildren } from '@angular/core';
import { SlideInfoService } from './services/slide-info.service';
import { NodeService } from './services/node.service';
import { RegService } from './services/reg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren("slideItem") slideItems: any;

  private getRegFile(): string {
    this.nodeService.fs.writeFileSync(this.regService.confPath, "",
      {encoding:"UTF-8", mode:0o666, flag:"a+"});
    let file = this.nodeService.fs.readFileSync(this.regService.confPath, (err) => {
      if(err) return "";  // 若异常则是文件不存在
    }).toString("UTF-8");
    return file;
  }

  constructor(private slideInfo: SlideInfoService,
    private nodeService: NodeService,
    private regService: RegService) {
    this.regService.setRegFile(this.getRegFile());
  }

  ngAfterViewInit(): void {
    // 传递侧边项目dom给侧边项目服务
    this.slideInfo.slideItems = this.slideItems;
  }

}
