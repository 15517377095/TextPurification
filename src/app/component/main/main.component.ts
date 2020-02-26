import { Component, OnInit } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';
import { ElectronService } from 'src/app/services/electron.service';
import { NodeService } from 'src/app/services/node.service';
import { FilesService } from 'src/app/services/files.service';


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

  // 选择文件
  public selectFiles(): void {
    // 编码监测插件
    let jschardet = window['require']("jschardet");
    // 编码转换插件
    let encoding = window['require']("encoding");
    // 获取用户选择文件路径
    let paths = this.openDialog();
    if(paths == null) return;
    // 遍历路径数组
    for (let i in paths) {
      // 读取文件
      let file = this.node.fs.readFileSync(paths[i], (err) => {
        if(err) return console.log("文件不存在" + "\n" + err);
      });
      // 获取编码
      let fileEncoding = jschardet.detect(file).encoding;
      console.log("encoding: " + fileEncoding);
      // 进一步分为 GBK 或 UTF-8，并将Buffer转为文本
      if (fileEncoding == "TIS-620" ||
        fileEncoding == "GB2312") {
        file = encoding.convert(file, "UTF-8", "GBK").toString("UTF-8");
      }else{
        file = file.toString("UTF-8");
      }
      // 存入文件状态服务
      let flag = this.filesService.push({
        "path": paths[i],
        "content": file
      });
      if (!flag) {
        alert(paths[i] + " 已存在");
      }
    }
  }

  constructor(
    private slideInfo: SlideInfoService,
    private electron: ElectronService,
    private node: NodeService,
    private filesService: FilesService) { }

  ngOnInit() {
    // 设置侧边项目样式
    this.slideInfo.setCurrentSlide(0);
    console.log(this.filesService.getFiles());
  }

}
