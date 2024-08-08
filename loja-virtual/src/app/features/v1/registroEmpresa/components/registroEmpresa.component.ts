import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoaJuridica } from 'src/app/core/models/pessoaJuridica';
import { CadastroEmpresaService } from 'src/app/core/guards/services/cadastroEmpresa/cadastroEmpresa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registroEmpresa',
  templateUrl: './registroEmpresa.component.html',
  styleUrls: ['./registroEmpresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  registroEmpresaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroEmpresaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registroEmpresaForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      inscricaoEstadual: [''],
      inscricaoMunicipal: [''],
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      categoria: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      tipoPessoa: [{ value: 'PJ', disabled: true }, Validators.required],
      ruaLogradouro: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
      tipoEndereco: ['', Validators.required]
    });
  }

  registrar(): void {

    const pessoaJuridica: PessoaJuridica = this.registroEmpresaForm.value;

    this.cadastroService.salvar(pessoaJuridica).subscribe(
      response => this.onRegistroSuccess(),
      error => this.onRegistroError(error)
    );

    if (this.registroEmpresaForm.invalid) {
      this.exibirMensagensErro();
      return;
    }
  }

  private exibirMensagensErro(): void {
    this.snackBar.open('Por favor, preencha todos os campos obrigatórios corretamente.', '', { duration: 5000 });
  }

  private onRegistroSuccess(): void {
    this.snackBar.open('Empresa registrada com sucesso!', '', { duration: 5000 });
    this.router.navigate(['/home']);
  }

  private onRegistroError(error: any): void {
    this.snackBar.open('Erro ao registrar empresa. Tente novamente.', '', { duration: 5000 });
  }
}
