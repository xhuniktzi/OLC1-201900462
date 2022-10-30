import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IRenderSymbol } from '../services/IRenderSymbol';

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
        console.log(data.graph);
      }
    });
  }
}
