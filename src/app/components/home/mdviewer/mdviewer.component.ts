import { Component, OnInit } from '@angular/core';

var md = require('markdown-it')();
// var search = require('full-text-search-light')({ ignore_case: false});
var fulltextsearchlight = require('full-text-search-light');
var search = new fulltextsearchlight({
  ignore_case: true   // default = true, Ignore case during all search queries
  // index_amount: 8;   // default = 12, The more indexes you have, the faster can be your search but the slower the 'add' method  gets
});

@Component({
  selector: 'app-mdviewer',
  templateUrl: './mdviewer.component.html',
  styleUrls: ['./mdviewer.component.scss']
})
export class MDViewerComponent implements OnInit {
  result = '';

  constructor() { }

  ngOnInit() {
    search.add({
      name: 'test',
      content: 'music of one'
    });
    search.add({
      name: 'CHEN',
      content: 'computer expert'
    });
    search.add({
      name: 'Carol',
      content: 'HR consultant'
    });
    console.log(search.search('ca'));
    this.result = md.render('# test rooby');
  }

}