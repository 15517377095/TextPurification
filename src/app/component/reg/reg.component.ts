import { Component, OnInit } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';
import { RegService } from 'src/app/services/reg.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  private regText: string = "aaa";

  public saveReg(): void {
    this.nodeService.fs.writeFileSync(__dirname + "\\..\\..\\reg.conf", this.regService.regFile,
      {encoding:"UTF-8", mode:0o666, flag:"w"});  // w:只写，不存在则创建
    // 更新状态
    this.regService.setRegFile(this.regService.regFile);
  }

  constructor(private slideInfo: SlideInfoService,
    private regService: RegService,
    private nodeService: NodeService) { }

  ngOnInit() {
    // 设置侧边项目样式
    this.slideInfo.setCurrentSlide(1);
  }

}
