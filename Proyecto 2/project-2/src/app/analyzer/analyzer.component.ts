import { Component, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';
import { wasmFolder } from '@hpcc-js/wasm';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css'],
})
export class AnalyzerComponent implements OnInit {
  input_compiler: string = '';
  output_compiler: string = '';
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onClickParser() {
    this.api.getImage({ text: this.input_compiler }).subscribe((data) => {
      if (data.graph != undefined) {
        wasmFolder('/assets'); // set the folder for wasm files
        graphviz('#graph').renderDot(data.graph);
      } else if (data.cout != undefined) {
        this.output_compiler = data.cout;
      }
    });
  }
}
