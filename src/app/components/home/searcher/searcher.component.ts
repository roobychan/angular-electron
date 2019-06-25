import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MarkdownFile } from '../../../markdown-file';

var fs = require('fs');
var fts = require('flexsearch');

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  sText:string;
  sOptions = [];
  sFiles = [];
  mdpath:string = 'src/assets/KB/';
  file:MarkdownFile;
  searcher = new fts({
    doc:{
      id:'filename',
      field:[
        // 'filename',
        'title',
        'content'
      ]
    }
  });
  displayedColumns: string[] = ['filename'];
  constructor() { }

  ngOnInit() {
    let files = fs.readdirSync(this.mdpath);
    files.forEach(element => {
      let mdfile = this.mdpath + element;
      let file:MarkdownFile = new MarkdownFile();
      let data = fs.readFileSync(mdfile ,{ encoding: 'utf-8'});
      file = new MarkdownFile();
      file.filename = mdfile;
      let lines = data.toString().split("\r\n");
      file.title = lines[0];
      lines.shift();
      file.content = lines.join('\r\n');
      this.sOptions.push(file);
      // this.search.emit('src/assets/test.md');
    });
    console.log(this.sOptions);
    this.sOptions.forEach(element => {
      this.searcher.add(element);
      this.sFiles.push(element);
    });
    console.log(this.searcher);
   }

  searchFile() {
    if (this.sText) {
      this.sOptions = this.searcher.search(this.sText);
    }else{
      this.sOptions = this.sFiles.slice();
    }
    
    // console.log(this.seacher);
    // console.log(this.seacher.search(this.sText));
  }

  showFile(name:string){
    this.search.emit(name);
  }
}
