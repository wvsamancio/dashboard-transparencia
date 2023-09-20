import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../interfaces/document';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public import(body: Document): Observable<Document> {
    return this.http.post<Document>(`${this.url}/import`, body);
  }
}
