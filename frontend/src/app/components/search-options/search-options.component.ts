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

  public contents: Array<any> = [];
  public opt: Array<string> = [];

  public operations = [
    { value: 'eq', viewValue: 'igual a' },
    { value: 'ne', viewValue: 'diferente de' },
    { value: 'lt', viewValue: 'nenor que' },
    { value: 'lte', viewValue: 'menor ou igual que' },
    { value: 'gt', viewValue: 'maior que' },
    { value: 'gte', viewValue: 'maior ou igual que' },
    { value: 'in', viewValue: 'contém' },
    { value: 'nin', viewValue: 'não contém' }
  ];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getContents().subscribe({
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