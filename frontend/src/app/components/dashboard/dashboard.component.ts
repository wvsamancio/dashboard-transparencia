import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public isLoaded: boolean = false;
  public chartLoaded: boolean = true;
  public items: any[] = [{ field: 'receita', operation: 'eq', value: 'IRRF' }];
  public subtitle: any = {}
  public contents: any[] = [];
  public columns: any[] = [];
  public category: Category = {} as Category;
  public chartTypes: any[] = [
    { value: "line", label: "Linha" },
    { value: "area", label: "Área" },
    { value: "bar", label: "Barra" },
    { value: "scatter", label: "Espalhado" }
  ];
  public params: any = {
    type: "line",
    chartView: []
  }

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {
    let obj = JSON.parse(sessionStorage.getItem('currentCategory') ?? '{}');
    this.category = obj;
  }

  addItemRow() {
    this.items.push({ field: '', operation: '', value: '' });
  }

  removeItemRow(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    }
  }

  setChartOptions(option: any) {
    this.chartLoaded = false;
    let index = this.params.chartView.findIndex((el: { value: any; }) => el.value === option);

    if (index == -1) this.params.chartView.push({ value: option });
    else this.params.chartView.splice(index, 1);

    this.cdr.detectChanges();
    this.chartLoaded = true;
  }

  setChartType(option: any) {
    this.chartLoaded = false;
    this.params.type = option;
    this.cdr.detectChanges();
    this.chartLoaded = true;
  }

  onSubmit(): void {
    this.isLoaded = false;
    const query = {
      category: this.category.name,
      items: this.items
    };
    this.dashboardService.dynamicQuery({ query }).subscribe({
      next: (next) => {
        this.subtitle = next[0].subtitle;
        this.columns = Object.keys(this.subtitle);
        this.contents = next.map((elem: any) => {
          let startPeriod = elem.startPeriod.split("/")[2];
          let endPeriod = elem.endPeriod.split("/")[2];
          return elem.filteredData.map((item: any) => ({ ...item, startPeriod, endPeriod }));
        }).flat();
        this.isLoaded = true;
      }
    });
  }
}
