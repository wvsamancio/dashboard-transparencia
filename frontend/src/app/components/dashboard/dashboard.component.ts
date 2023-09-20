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
  public items: any[] = [{ field: '', operation: '', value: '' }];
  public subtitle: any = {}
  public contents: any[] = [];
  public columns: any[] = [];

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) { }

  addItemRow() {
    this.items.push({ field: '', operation: '', value: '' });
  }

  onSubmit(): void {
    const query = { query: this.items };
    this.dashboardService.dynamicQuery(query).subscribe({
      next: (next) => {
        this.subtitle = next[0].subtitle;
        this.columns = Object.keys(this.subtitle);
        this.contents = next.map((each: any) => each.filteredData).flat();
        this.isLoaded = true;
      }
    });
  }
}
