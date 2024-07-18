import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private service: LoginService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.service.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.log(err.status + ' chegou aqui');
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }

        let errorMsg = '';
        if (err.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${err.error.message}`;
        } else if (err instanceof HttpErrorResponse) {
          console.log('This is client side error');
          if (err.error.erros) {
            errorMsg =
              'Erro de validação! Campo: ' +
              err.error.erros[0].fieldName +
              '. Detalhes do erro: ' +
              err.error.erros[0].message;
          } else {
            errorMsg = 'Erro de validação! ' + err.error.message;
          }
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${err},  Message: ${err}`;
        }
        console.log(errorMsg);
        setTimeout(() => {
          this.snackBar.open(errorMsg, '', { duration: 8000 });
        });
        return throwError(errorMsg);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
