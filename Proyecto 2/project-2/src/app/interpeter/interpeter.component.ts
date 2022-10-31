import { Component, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';
import { ApiService } from '../services/api.service';
import { IRenderSymbol } from '../services/IRenderSymbol';
import { wasmFolder } from '@hpcc-js/wasm';
@Component({
  selector: 'app-interpeter',
  templateUrl: './interpeter.component.html',
  styleUrls: ['./interpeter.component.css'],
})
export class InterpeterComponent implements OnInit {
  input_compiler: string = '';
  output_compiler: string = '';

  symbols: IRenderSymbol[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onClickParser() {
    this.api.getApiData({ text: this.input_compiler }).subscribe((data) => {
      this.output_compiler = data.cout;
      if (data.table != undefined) {
        this.symbols = data.table;
      }
      if (data.graph != undefined) {
        wasmFolder('/assets'); // set the folder for wasm files
        graphviz('#graph').renderDot(data.graph);
      }
    });
  }
}
