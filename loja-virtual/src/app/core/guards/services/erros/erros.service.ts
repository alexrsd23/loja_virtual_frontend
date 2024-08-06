import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrosService {

  getErrorMessage(error: any): string {

    if (error.error instanceof ErrorEvent) {
      return `Erro do cliente: ${error.error.message}`;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Não autorizado. Redirecionando para o login...';
      } else if (error.status === 403) {
        return 'Acesso proibido. Redirecionando para a página de acesso negado...';
      }

      if (error.error.erros && error.error.erros.length > 0) {
        return 'Erro de validação! Campo: ' +
          error.error.erros[0].fieldName +
          '. Detalhes: ' +
          error.error.erros[0].message;
      }

      return 'Erro de validação! ' + (error.error.message || 'Erro desconhecido');
    }

    return `Código do erro: ${error.status}, Mensagem: ${error.message || 'Erro desconhecido'}`;
  }
}
