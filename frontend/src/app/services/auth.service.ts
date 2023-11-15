import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';
  private messageSource = new BehaviorSubject('');
  private authenticatedSource = new BehaviorSubject(false);

  token = '';
  currentMessage = this.messageSource.asObservable();
  currentAuthenticate = this.authenticatedSource.asObservable();

  constructor(private http: HttpClient) { }

  public changeAuthenticateStatus(status: boolean) {
    this.authenticatedSource.next(status);
  }

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }

  public register(user: any) {
    return this.http.post(`${this.url}/register`, user);
  }

  public login(user: any) {
    return this.http.post(`${this.url}/login`, user, { withCredentials: true });
  }

  public me() {
    return this.http.get(`${this.url}/me`, { withCredentials: true });
  }

  public logout() {
    return this.http.post(`${this.url}/logout`, {}, { withCredentials: true });
  }
}
