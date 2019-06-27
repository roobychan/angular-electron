import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input } from "@angular/core";
import { MarkdownFile } from "../../../markdown-file";

var ipc = require('electron').ipcRenderer;
var fs = require("fs");
var fts = require("flexsearch");

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"]
})
export class SearcherComponent implements OnInit {
  @Input() mdpath: string;
  @Output() search = new EventEmitter<[string,string]>();
  @ViewChild("sInput", { static: false }) sInput: ElementRef;

  sText: string;
  sOptions = [];
  sFiles = [];
  // mdpath:string = 'src/assets/KB/';
  file: MarkdownFile;
  searcher = new fts({
    doc: {
      id: "filename",
      field: [
        // 'filename',
        "title",
        "content"
      ]
    }
  });
  displayedColumns: string[] = ["filename"];
  constructor() {}

  ngOnInit() {    
    ipc.on('toSearch',()=>{
      console.log('toSearch');
      this.sInput.nativeElement.focus();
    });
    this.getFiles();
  }

  ngAfterViewInit(){
    this.sInput.nativeElement.focus();
    console.log("after view init")
  }

  ngOnChanges() {
    this.getFiles();
  }

  getFiles() {
    this.sOptions = [];
    if (!this.mdpath) {
      return;
    }
    let files = fs.readdirSync(this.mdpath);
    files.forEach(element => {
      let mdfile = this.mdpath + element;
      let file: MarkdownFile = new MarkdownFile();
      let data = fs.readFileSync(mdfile, { encoding: "utf-8" });
      file = new MarkdownFile();
      file.filename = element;
      let lines = data.toString().split("\r\n");
      file.title = lines[0];
      lines.shift();
      file.content = lines.join("\r\n");
      this.sOptions.push(file);
      // this.search.emit('src/assets/test.md');
    });
    this.sOptions.forEach(element => {
      this.searcher.add(element);
      this.sFiles.push(element);
    });
  }

  searchFile() {
    if (this.sText) {
      this.sOptions = this.searcher.search(this.sText);
    } else {
      this.sOptions = this.sFiles.slice();
    }
  }

  showFile(name: string) {
    this.search.emit([this.mdpath + name,this.sText]);
  }
}

