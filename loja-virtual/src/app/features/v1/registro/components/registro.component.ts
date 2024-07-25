import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CadastroService } from 'src/app/core/guards/services/cadastro/cadastro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'fa-eye';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cadastroService: CadastroService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      senha: ['', [Validators.required, Validators.minLength(10), this.senhaValidator]],
      repetirSenha: ['', Validators.required]
    }, { validator: this.checkPasswords });
    this.updatePasswordValidation();
  }

  private updatePasswordValidation(): void {
    this.registroForm.get('senha')?.updateValueAndValidity();
  }

  private checkPasswords(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const repetirSenha = group.get('repetirSenha')?.value;
    return senha === repetirSenha ? null : { notSame: true };
  }

  togglePasswordVisibility(): void {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIconClass = 'fa-eye-slash';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIconClass = 'fa-eye';
    }
  }

  registrar(): void {
    const usuario = {
      email: this.registroForm.value.email,
      login: this.registroForm.value.login,
      senha: this.registroForm.value.senha,
      dataSenha: new Date().toISOString().split('T')[0] // yyyy-mm-dd
    };

    console.log(usuario);

    if (this.registroForm.invalid) {
      this.exibirMensagensErro();
      return;
    }
    this.cadastroService.salvar(usuario).subscribe(
      (response) => {
        this.onRegistroSuccess()
      },
      (error) => {
        this.onRegistroError(error);
      }
    );
  }

  private exibirMensagensErro() {
    const loginControl = this.registroForm.get('login');
    const senhaControl = this.registroForm.get('senha');
    const emailControl = this.registroForm.get('email');

    if (loginControl?.hasError('required')) {
      this.mensagemErro('Login é obrigatório.');
    } else if (loginControl?.hasError('minlength')) {
      this.mensagemErro('Login deve ter pelo menos 4 caracteres.');
    } else if (loginControl?.hasError('maxlength')) {
      this.mensagemErro('Login não pode ter mais de 10 caracteres.');
    }

    if (senhaControl?.hasError('required')) {
      this.mensagemErro('Senha é obrigatória.');
    } else if (senhaControl?.hasError('minlength')) {
      this.mensagemErro('Senha deve ter pelo menos 10 caracteres.');
    } else if (senhaControl?.hasError('number')) {
      this.mensagemErro('Senha deve conter ao menos um número.');
    } else if (senhaControl?.hasError('uppercase')) {
      this.mensagemErro('Senha deve conter ao menos uma letra maiúscula.');
    } else if (senhaControl?.hasError('specialCharacter')) {
      this.mensagemErro('Senha deve conter ao menos um caractere especial.');
    }
  }

  private onRegistroSuccess(): void {
    this.snackBar.open('Usuário registrado com sucesso!', '', { duration: 5000 });
    this.router.navigate(['/login']);
  }

  private onRegistroError(error: any): void {
    this.mensagemErro('Erro ao registrar usuário. Tente novamente.');
  }

  private mensagemErro(mensagem: string): void {
    this.snackBar.open(mensagem, '', { duration: 5000 });
  }

  private senhaValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.value;
    if (!senha) return null;

    const temNumero = /\d/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    const errors: ValidationErrors = {};

    if (!temNumero) {
      errors['number'] = true;
    }

    if (!temMaiuscula) {
      errors['uppercase'] = true;
    }

    if (!temCaractereEspecial) {
      errors['specialCharacter'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  isPasswordValid(criteria: number): boolean {
    const senha = this.registroForm.get('senha')?.value || '';
    switch (criteria) {
      case 1:
        return senha.length >= 10;
      case 2:
        return /\d/.test(senha);
      case 3:
        return /[!@#$%^&*(),.?":{}|<>]/.test(senha);
      case 4:
        return /[A-Z]/.test(senha);
      default:
        return false;
    }
  }
}
