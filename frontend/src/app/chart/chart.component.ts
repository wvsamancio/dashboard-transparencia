import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() chartContents: any[] = [];
  @Input() chartSubtitle: any = {};

  public chartType = [
    "line", "area", "columm", "bar"
  ]

  public columns: any[] = [];

  chartOptions: any;

  constructor() { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() {

    const request = {
      x: "time",
      type: "line",
      chartView: [
        {
          value: "previsto"
        },
        {
          value: "arrecadado"
        }
      ]
    }

    let series: { name: string; data: any[]; }[] = [];
    let categories: string[] = [];

    this.columns = Object.keys(this.chartSubtitle);

    this.chartContents.map((elem: any) => {
      categories.push(`${elem.startPeriod}-${elem.endPeriod}`);
    });

    request.chartView.map((item: any) => {
      series.push({
        name: this.chartSubtitle[item.value],
        data: this.chartContents.map((elem: any) => elem[item.value])
      });
    });

    this.chartOptions = {
      series: series, chart: {
        type: request.type,
      },
      xaxis: {
        categories: categories
      },
    };
  }
}
