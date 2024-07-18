import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { UsuarioService } from './services/usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoGuard implements CanActivate {
  constructor(
    private userAuthService: LoginService,
    private router: Router,
    private userService: UsuarioService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const roles = route.data['roles'] as Array<string>;
      if (roles) {
        const match = this.userService.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}