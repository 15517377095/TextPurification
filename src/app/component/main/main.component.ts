import { Component, OnInit } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';
import { ElectronService } from 'src/app/services/electron.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // 弹出文件选择框
  public openDialog(): Array<string> {
    return this.electron.dialog.showOpenDialogSync({
      properties: [  // 对话框应该使用的特征
          'openFile',  // 允许选择文件
          'multiSelections'  // 允许选择多个路径
      ]
    })
  }

  // 添加文件
  public addFiles(): void {
    // 等待用户选择文件
    let paths: Array<string> = this.openDialog();
    if (paths == null) return;
    // 遍历路径
    for (let i in paths) {
      var file = this.node.fs.readFileSync(paths[i], (err, data) => {
        if(err) return console.log("文件不存在" + "\n" + err);
      });
    }
  }

  constructor(
    private slideInfo: SlideInfoService,
    private electron: ElectronService,
    private node: NodeService) { }

  ngOnInit() {
    // 设置侧边项目样式
    this.slideInfo.setCurrentSlide(0);
  }

}
