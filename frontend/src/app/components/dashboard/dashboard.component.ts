import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NgForm } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public isLoaded: boolean = false;
  public items: any[] = [{ field: 'receita', operation: 'eq', value: 'IRRF' }];
  public subtitle: any = {}
  public contents: any[] = [];
  public columns: any[] = [];

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) { }

  addItemRow() {
    this.items.push({ field: '', operation: '', value: '' });
  }

  removeItemRow(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.isLoaded = false;
    const query = { query: this.items };
    this.dashboardService.dynamicQuery(query).subscribe({
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
