import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private categoryService: CategoryService) { }

  public categories: Category[] = [];

  public isLoaded: boolean = false;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (next) => {
        this.categories = next;
        this.isLoaded = true;
      }
    });
  }

  public delete(id: string): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(category => category._id !== id);
      }
    });
  }

}
