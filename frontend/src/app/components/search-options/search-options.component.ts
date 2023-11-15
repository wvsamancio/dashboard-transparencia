import { Component, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent {
  @Input() item: any = {
    field: '',
    operation: '',
    value: '',
  };

  public category: any = {};
  public contents: Array<any> = [];
  public opt: Array<string> = [];

  public operations = [
    { value: 'eq', viewValue: 'igual a' },
    { value: 'ne', viewValue: 'diferente de' },
    { value: 'lt', viewValue: 'menor que' },
    { value: 'lte', viewValue: 'menor ou igual que' },
    { value: 'gt', viewValue: 'maior que' },
    { value: 'gte', viewValue: 'maior ou igual que' }
  ];

  constructor(private dashboardService: DashboardService) {
    let obj = JSON.parse(sessionStorage.getItem('currentCategory') ?? '{}');
    this.category = { category: obj.name };
  }

  ngOnInit(): void {
    this.dashboardService.getContents(this.category).subscribe({
      next: (next) => {
        this.contents = next;
        for (let key in this.contents[0].subtitle) {
          this.opt.push(key);
        }
        this.opt.sort();
      }
    });
  }

  // Helper method to get the keys of an object
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
