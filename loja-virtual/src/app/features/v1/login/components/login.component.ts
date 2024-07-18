import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/core/guards/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  passwordFieldType: string = 'password'; // Tipo do campo de senha
  passwordIconClass: string = 'fa-eye'; // Classe do ícone de olho

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      login: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(4)
        ]
      ],
      senha: [
        '',
        [Validators.required]
      ]
    });
  }

  logar(): void {
    if (this.login.invalid) {
      this.exibirMensagensErro();
      return;
    }
  
    const usuario = this.login.getRawValue();
    this.loginService.login(usuario).subscribe(
      (response: any) => {
        this.loginService.setRoles(response.usuario.roles[0].roleName);
        this.loginService.setToken(response.token);
        this.loginService.setRoles(response.usuario.roles);
  
        const role = response.usuario.roles[0].roleName;
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.mensagemErro();
      }
    );
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

  private exibirMensagensErro() {
    const loginControl = this.login.get('login');
    const senhaControl = this.login.get('senha');
  
    if (loginControl?.hasError('required')) {
      this.mensagemErro('Login é obrigatório.');
    } else if (loginControl?.hasError('minlength')) {
      this.mensagemErro('Login deve ter pelo menos 4 caracteres.');
    } else if (loginControl?.hasError('maxlength')) {
      this.mensagemErro('Login não pode ter mais de 10 caracteres.');
    }
  
    if (senhaControl?.hasError('required')) {
      this.mensagemErro('Senha é obrigatória.');
    }
  }
  
  private mensagemErro(mensagem: string = 'Ocorreu um erro inesperado.') {
    console.log('Exibindo mensagem de erro:', mensagem);
    this.snackBar.open(mensagem, '', { duration: 5000 });
  }

  reiniciar(): void {
    this.login.reset();
  }
}
