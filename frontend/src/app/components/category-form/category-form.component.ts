import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  constructor(private categoryService: CategoryService) { }

  public category: Category = {} as Category;
  public success: boolean = false;
  public isLoading: boolean = false;

  public onSubmit(categoryForm: NgForm): void {

    //
    //if (categoryForm.invalid) return;

    this.isLoading = true;
    categoryForm.value.userEmail = 'wvsamancio@gmail.com';
    this.categoryService.create(categoryForm.value).subscribe({
      next: (next) => {
        this.category = next;
        this.success = true;
        categoryForm.reset();
        this.isLoading = false;
      }
    });
  }

  onSubmitClicked() {
    console.log('Submit button clicked!');
  }
}
