import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  public regFile: string;

  public regFileOld: string;

  public confPath: string = "D:\\reg.conf";

  public setRegFile(value): void {
    this.regFile = this.regFileOld = value;
  }

  public getReg(): Array<string> {
    // 以换行拆分
    let regs = this.regFileOld.split("\n");
    for(let i in regs) {
      // 清除空行
      if(/^\s*$/.test(regs[i])) {
        console.log(regs[i])
        regs[i] = null;
      }
      // 清除注释行（#）
      // 单行
      if(/^[\s]*#/.test(regs[i])) {
        regs[i] = null;
      }
      // 行尾
      if(/\/[igmsUxaDe\s]*#/.test(regs[i])) {
        regs[i] = regs[i].match(/[^]*\/[igmsUxaDe\s]*[^#]*/)[0];
      }
      // 去前后空格
      if(regs[i] != null){
        regs[i] = regs[i].trim();
      }
    }
    // 去空项
    for(let i in regs) {
      if(regs[i] == null){
        regs.splice(parseInt(i), 1);
      }
    }
    console.log(regs);
    return regs;
  }

  constructor() { }
}
