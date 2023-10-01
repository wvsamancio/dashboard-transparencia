import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.url}/categories`).pipe(
      response => response,
      error => error
    );
  }

  public create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}/categories`, category).pipe(
      response => response,
      error => error
    );
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/categories/${id}`);
  }
}
