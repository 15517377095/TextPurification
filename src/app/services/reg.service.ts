import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  public regFile: string;

  public regFileOld: string;

  public setRegFile(value): void {
    this.regFile = this.regFileOld = value;
  }

  public getReg(): Array<string> {
    // 以换行拆分
    let regs = this.regFileOld.split("\n");
    for(let i in regs) {
      // 去前后空格
      regs[i] = regs[i].trim();
      // 清除注释行（#）
      if(/[\s]*#/.test(regs[i])) {
        regs[i] = null;
      }
    }
    // 去空项
    for(let i in regs) {
      if(regs[i] == null || regs[i] == ""){
        regs.splice(parseInt(i), 1);
      }
    }
    return regs;
  }

  constructor() { }
}
