import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private files: Array<{path: string,content: string}> = [];

  public push(obj: {path: string,content: string}): Boolean{
    for (let i in this.files) {
      if (this.files[i].path == obj.path){
          return false;
      }
    }
    this.files.push(obj);
    return true;
  }

  public getFiles(): Array<{path: string,content: string}> {
    return this.files;
  }

  constructor() { }
}
