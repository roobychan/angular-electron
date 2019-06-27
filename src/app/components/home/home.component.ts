import { Component, OnInit } from '@angular/core';

// var fpath = require('path');
var fs = require('fs');
var config = require('electron-json-config');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  file = '';
  path:string ;
  sText:string;
  settings = {};
  outpram: [string,string];
  constructor() { }

  ngOnInit() {
    // this.path = 'src/assets/KB/'
    this.path = config.get('path');
  }

  onSearch(file:string){
    this.file = file;
    this.outpram = [this.file,this.sText];
    console.log(this.outpram);
  }

  getPath() {
    const { dialog } = require("electron").remote;
    let spath  = dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    if (spath) {
      this.path = spath[0]+'/';
    } else {
      return;
    }
    config.set('path',this.path);
    // console.log(this.path);
    // this.path = fpath.relative(process.cwd(), this.path)+'/';
 }
}
