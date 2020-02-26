import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SlideInfoService } from 'src/app/services/slide-info.service';
import { ElectronService } from 'src/app/services/electron.service';
import { NodeService } from 'src/app/services/node.service';
import { FilesService } from 'src/app/services/files.service';
import * as $ from 'jquery';
import { RegService } from 'src/app/services/reg.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("inputBox",{static: true}) inputBox: ElementRef;

  public startClear(): void {
    // 备份原文件
    this.backupFiles();

    let regs = this.regService.getReg();
    let files = this.filesService.getFiles();
    // 遍历规则
    for (let i in regs) {
      let regExp = eval(regs[i]);
      // 遍历文件
      for (let j = 0; j < files.length; j++) {
        // 删除符合规则的字符串
        files[j].content = files[j].content.replace(regExp ,"");
        // 保存文件
        this.writeFiles();
      }
    }
    alert("净化完成");
  }

  public writeFiles(): Boolean {
    let files = this.filesService.getFiles();
    for (let i in files) {
      this.node.fs.writeFileSync(files[i].path, files[i].content,
        {encoding:"UTF-8", mode:0o666, flag:"w"});
    }
    return true;
}

  public backupFiles(): void {
    let files = this.filesService.getFiles();
    for (let i in files) {
      this.node.fs.renameSync(files[i].path, files[i].path + "_bk");
    }
  }

  // 弹出文件选择框
  public openDialog(): Array<string> {
    return this.electron.dialog.showOpenDialogSync({
      properties: [  // 对话框应该使用的特征
          'openFile',  // 允许选择文件
          'multiSelections'  // 允许选择多个路径
      ]
    })
  }

  public saveFile(path): void {
    if (!(/.txt/i.test(path))){
      return;
    }
    // 编码监测插件
    let jschardet = window['require']("jschardet");
    // 编码转换插件
    let encoding = window['require']("encoding");
    // 读取文件
    let file = this.node.fs.readFileSync(path, (err) => {
      if(err) return console.log("文件不存在" + "\n" + err);
    });
    // 获取编码
    let fileEncoding = jschardet.detect(file).encoding;
    // console.log("encoding: " + fileEncoding);
    // 进一步分为 GBK 或 UTF-8，并将Buffer转为文本
    if (fileEncoding == "TIS-620" ||
      fileEncoding == "GB2312") {
      file = encoding.convert(file, "UTF-8", "GBK").toString("UTF-8");
    }else{
      file = file.toString("UTF-8");
    }
    // 存入文件状态服务
    let flag = this.filesService.push({
      "path": path,
      "content": file
    });
    if (!flag) {
      alert(path + " 已存在");
    }
  }

  // 选择文件
  public selectFiles(): void {
    // 获取用户选择文件路径
    let paths = this.openDialog();
    if(paths == null) return;
    // 遍历路径数组
    for (let i in paths) {
      this.saveFile(paths[i]);
    }
  }

  // 移除项目
  public removeItem(i): void {
    this.filesService.remove(i);
  }

  public setDropEvent(): void {
    let inputBox = $(".inputBox");

    inputBox.on("dragenter dragover dragleave", event => {
      event.preventDefault();
    })

    inputBox.on("drop", event => {
      event.preventDefault();
      let files = event.originalEvent.dataTransfer.files;
      for (let i = 0; i < files.length; i++){
        this.saveFile(files[i].path);
      }
      return false;
    })
  }

  constructor(
    private slideInfo: SlideInfoService,
    private electron: ElectronService,
    private node: NodeService,
    private filesService: FilesService,
    private regService: RegService) { }

  ngOnInit() {
    // 设置侧边项目样式
    this.slideInfo.setCurrentSlide(0);
  }

  ngAfterViewInit(): void {
    this.setDropEvent();
  }

}
