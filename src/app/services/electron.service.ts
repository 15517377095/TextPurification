import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  private electron = window['require']('electron').remote;

  public dialog = this.electron.dialog;

  constructor() { }
}
