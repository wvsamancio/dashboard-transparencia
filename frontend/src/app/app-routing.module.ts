import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  { path: '', component: CategoryComponent, data: { title: 'Home' } },
  { path: 'categories', component: CategoryFormComponent, data: { title: 'Categorias' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'import', component: ImportComponent, data: { title: 'Importar CSV' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
