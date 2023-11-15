import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private categoryService: CategoryService, private router: Router) { }

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

  public async delete(id: string): Promise<void> {

    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

    });
    if (!result.isConfirmed) return;

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(category => category._id !== id);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Categoria excluída com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  public openImport(category: Category): void {
    sessionStorage.setItem('currentCategory', JSON.stringify(category));
    this.router.navigate(['/import']);
  }

  public openCharts(category: Category): void {
    sessionStorage.setItem('currentCategory', JSON.stringify(category));
    this.router.navigate(['/dashboard']);
  }


}
