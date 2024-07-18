import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private service: LoginService) {}
  
  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.service.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].authority === allowedRoles[j]) {
            isMatch = true;
            break;
          }
        }
      }
    }

    return isMatch;
  }
}
