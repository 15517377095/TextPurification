import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  public fs = window['require']('fs');

  constructor() { }
}
