import { Component, OnInit } from '@angular/core';

var fpath = require('path');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  file = '';
  path = '';
  
  constructor() { }

  ngOnInit() {
    this.path = 'src/assets/KB/'
  }

  onSearch(file:string){
    this.file = file;
  }

  getPath() {
    const { dialog } = require("electron").remote;
    let spath  = dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    if (spath) {
      this.path = spath[0]
    } else {
      return;
    }
    this.path = fpath.relative(process.cwd(), this.path)+'/';
 }
}
