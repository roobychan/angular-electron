import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { Input } from "@angular/core";
import { MarkdownFile } from "../../../markdown-file";
import { truncateSync } from "fs";

var md = require("markdown-it")();
var fs = require("fs");

@Component({
  selector: "app-mdviewer",
  templateUrl: "./mdviewer.component.html",
  styleUrls: ["./mdviewer.component.scss", "./markdown.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MDViewerComponent implements OnInit{
  file: MarkdownFile;
  @Input() inputpram: [2];
  @ViewChild("mdContainer", { static: false }) mdContainer: ElementRef;
  @ViewChild("mdTitle", { static: false }) mdTitle: ElementRef;
  mdfile: string;
  sText: string;
  constructor() {}

  ngOnInit() {
    this.mdfile = this.inputpram[0][0];
    this.sText = this.inputpram[0][1];
    if (this.mdfile === "") {
      return;
    }
  }
  ngOnChanges() {
    this.sText = this.inputpram[0][1];
    this.mdfile = this.inputpram[0][0];
    if (this.mdfile === "" || !this.mdfile) {
      return;
    }

    fs.readFile(this.mdfile, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      this.file = new MarkdownFile();
      this.file.filename = this.mdfile;
      let lines = data.toString().split("\r\n");
      this.file.title = lines[0];
      lines.shift();
      this.file.content = lines.join("\r\n");
      let title: string = md.render(this.file.title);
      let content: string = md.render(this.file.content);

      if (this.sText) {
        title = this.highlight(title, this.sText);
        content = this.highlight(content, this.sText);
      }
      this.mdContainer.nativeElement.innerHTML = content;
      this.mdTitle.nativeElement.innerHTML = title;
    });
  }

  highlight(text: string, strReplace: string) {
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    var reg = new RegExp(esc, "ig");
    return text.replace(reg, "<mark>$&</mark>");
  }
}
