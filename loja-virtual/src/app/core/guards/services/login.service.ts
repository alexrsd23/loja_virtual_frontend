import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const api = environment.baseUrlApi + '/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient) {}

  login(loginData: any) {
    return this.http.post(api, loginData, { headers: this.requestHeader });
  }
  
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRolest(): string {
    return localStorage.getItem('roles') ?? '';
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

}