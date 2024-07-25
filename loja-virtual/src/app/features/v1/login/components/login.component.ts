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
  passwordFieldType: string = 'password';
  passwordIconClass: string = 'fa-eye';
  greetingMessage: string = '';
  backgroundClass: string = '';
  stars: { top: number, left: number }[] = [];
  starsBig: { top: number, left: number }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setGreetingMessageAndBackground();
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
    if (this.backgroundClass === 'noite-background') {
      this.generateRandomStars(50);
      this.generateRandomStarsBig(20); // Define o número de estrelas
    }
  }

  generateRandomStars(count: number) {
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 4000;
      const left = Math.random() * 20000;
      this.stars.push({ top, left });
    }
  }

  generateRandomStarsBig(count: number) {
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 1000;
      const left = Math.random()*2 * 4000;
      this.starsBig.push({ top, left });
    }
  }

  setGreetingMessageAndBackground(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 5) {
      this.greetingMessage = 'Boa madrugada';
      this.backgroundClass = 'madrugada-background';
    } else if (currentHour >= 5 && currentHour < 12) {
      this.greetingMessage = 'Bom dia';
      this.backgroundClass = 'manha-background';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greetingMessage = 'Boa tarde';
      this.backgroundClass = 'tarde-background';
    } else {
      this.greetingMessage = 'Boa noite';
      this.backgroundClass = 'noite-background';
    }
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
    this.snackBar.open(mensagem, '', { duration: 5000 });
  }

  reiniciar(): void {
    this.login.reset();
  }
}
