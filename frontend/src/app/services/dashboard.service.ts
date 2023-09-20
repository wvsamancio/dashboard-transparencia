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

  public getContents(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.url}/contents`).pipe(
      response => response,
      error => error
    );
  }

  public dynamicQuery(query: any): Observable<any[]> {
    console.log(query);
    return this.http.post<any[]>(`${this.url}/contents`, query).pipe(
      response => response,
      error => error
    );
  }
}
