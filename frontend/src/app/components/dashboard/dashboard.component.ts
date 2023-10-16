import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // pagination and data
  public currentPage: any = 1;
  public itemsPerPage: any = 5;
  public currentContents: any[] = [];
  public contents: any[] = [];

  // loading
  public isLoaded: boolean = false;
  public chartLoaded: boolean = true;

  // filter
  //public items: any[] = [{ field: 'fun��o', operation: 'eq', value: 'Cultura' }];
  public items: any[] = [{ field: 'receita', operation: 'eq', value: 'IRRF' }];
  public formHasError: boolean = false;
  public filteredColumns: any[] = [];

  // table content
  public subtitle: any = {}
  public columns: any[] = [];

  // chart options
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

  updatePage(type: any) {

    if (type === 'next') {
      if (this.currentPage < this.contents.length / this.itemsPerPage) {
        this.currentPage++;
      }
    } else if (type === 'prev') {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    } else {
      this.currentPage = type;
    }

    this.currentContents = this.contents.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);

    this.cdr.detectChanges();
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

  filterColumns() {
    let content = this.contents[0];

    const filteredColumns = this.columns.filter((col: any) => {
      let value = content[col];
      let regex = new RegExp(/^[0-9.,]+$/);
      return value.match(regex) != null;
    });

    this.filteredColumns = [...filteredColumns];
  }

  onSubmit(): void {

    this.formHasError = false;

    this.items.map(item => { if (!item.value || !item.operation || !item.field) this.formHasError = true });

    if (this.formHasError) {
      setTimeout(() => { this.formHasError = false; }, 3000);
      return;
    };

    this.isLoaded = false;
    this.chartLoaded = false;
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

        // construindo visualização inicial da tabela
        this.currentContents = this.contents.slice(0, this.itemsPerPage);
        // filtrando colunas com conteúdo númerico
        this.filterColumns();

        this.isLoaded = true;

        // resetando o grafico
        this.params.chartView = [];
        this.chartLoaded = true;
      }
    });
  }
}
