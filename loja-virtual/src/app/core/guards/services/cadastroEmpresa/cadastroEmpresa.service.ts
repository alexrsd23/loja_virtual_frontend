import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { PessoaJuridica } from 'src/app/core/models/pessoaJuridica';
import { environment } from 'src/environments/environment.prod';

const api = environment.baseUrlApi + '/pessoaJuridica/criarPessoaJuridica';

@Injectable({
  providedIn: 'root'
})
export class CadastroEmpresaService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'False' });
  constructor(private http: HttpClient) { }

  salvar(pessoaJuridica: Partial<PessoaJuridica>): Observable<PessoaJuridica> {
    return this.http.post<PessoaJuridica>(api, pessoaJuridica, { headers: this.requestHeader });

  }
}
