export interface Usuario {
    id?: number;
    login: string;
    email: string;
    senha: string;
    roles: string[];
    dataSenha: string;
  }