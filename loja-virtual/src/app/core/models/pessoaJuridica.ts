export interface PessoaJuridica {
    id?: number;
    cnpj: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    nomeFantasia: string;
    razaoSocial: string;
    categoria: string;

    nome: string;
    email: string;
    telefone: string;
    tipoPessoa: string;

    ruaLogradouro: string;
    cep: string;
    numero: string;
    complemento: string;
    bairro: string;
    uf: string;
    cidade: string;
    tipoEndereco: string[];
}

