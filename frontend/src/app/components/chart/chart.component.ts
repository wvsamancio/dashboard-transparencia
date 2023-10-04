import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() chartContents: any[] = [];
  @Input() chartSubtitle: any = {};
  @Input() chartRequest: any = {};

  public chartType = [
    "line", "area", "columm", "bar"
  ]

  public columns: any[] = [];

  chartOptions: any;

  constructor() { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() {

    //TOOD: implementar formulário para escolher o tipo de gráfico
    //TODO: implementar formulário para escolher atributos que devem ser mostraddos (previsto, arrecado, etc..)


    let series: { name: string; data: any[]; }[] = [];
    let categories: string[] = [];

    this.columns = Object.keys(this.chartSubtitle);

    this.chartContents.map((elem: any) => {
      categories.push(`${elem.startPeriod}-${elem.endPeriod}`);
    });

    this.chartRequest.chartView.map((item: any) => {
      console.log({ item })
      series.push({
        name: this.chartSubtitle[item.value],
        data: this.chartContents.map((elem: any) => elem[item.value])
      });

    });

    console.log(series);

    this.chartOptions = {
      series: series, chart: {
        type: this.chartRequest.type,
      },
      xaxis: {
        categories: categories
      },
    };
  }
}
