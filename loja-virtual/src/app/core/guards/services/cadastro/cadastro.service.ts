import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';
import { environment } from 'src/environments/environment.prod';

const api = environment.baseUrlApi + '/usuarios/criarUsuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(private http: HttpClient) { }

  salvar(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(api, usuario, { headers: this.requestHeader });
  }
}
