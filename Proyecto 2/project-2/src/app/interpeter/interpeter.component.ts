import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-interpeter',
  templateUrl: './interpeter.component.html',
  styleUrls: ['./interpeter.component.css'],
})
export class InterpeterComponent implements OnInit {
  input_compiler: string = '';
  output_compiler: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onClickParser() {
    this.api.getApiData({ text: this.input_compiler }).subscribe((data) => {
      this.output_compiler = data.cout;
    });
  }
}
