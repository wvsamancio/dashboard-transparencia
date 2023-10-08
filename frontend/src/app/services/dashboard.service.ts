import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getContents(category: string): Observable<Document[]> {
    return this.http.post<Document[]>(`${this.url}/contents`, category).pipe(
      response => response,
      error => error
    );
  }

  public dynamicQuery(query: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/preview`, query).pipe(
      response => response,
      error => error
    );
  }
}
