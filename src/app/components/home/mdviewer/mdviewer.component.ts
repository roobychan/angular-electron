import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { MarkdownFile } from '../../../markdown-file';


var md = require('markdown-it')();
var fs = require('fs');

@Component({
  selector: 'app-mdviewer',
  templateUrl: './mdviewer.component.html',
  styleUrls: ['./mdviewer.component.scss','./markdown.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class MDViewerComponent implements OnInit {
  file: MarkdownFile;
  @Input() mdfile;
  @ViewChild('mdContainer',{static: false}) mdContainer: ElementRef;
  @ViewChild('mdTitle',{static: false}) mdTitle: ElementRef;
  constructor() { }

  ngOnInit() {
    if (this.mdfile === '') {
      return;
    }
  }
  ngOnChanges() {
    console.log(this.mdfile);
    if (this.mdfile === '') {
      return;
    }
    fs.readFile(this.mdfile ,{ encoding: 'utf-8'}, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.file = new MarkdownFile();
      this.file.filename = this.mdfile;
      let lines = data.toString().split("\r\n");
      this.file.title = lines[0];
      // this.result = md.render('# test roooby');
      lines.shift();
      this.file.content = lines.join('\r\n');
      this.mdContainer.nativeElement.innerHTML = md.render(this.file.content);
      this.mdTitle.nativeElement.innerHTML = md.render(this.file.title);
    });
  }
}