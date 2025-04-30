import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  isTransitioning: boolean = false;

  constructor(private router: Router) {}

  login() {
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.isTransitioning = true;

      setTimeout(() => {
        document.body.classList.add('page-transition-in'); // Adiciona a classe para expandIn
        this.router.navigate(['/inicio']); // Redireciona para a página de boas-vindas
      }, 500); // Tempo para expandOut
    }, 3000); // Tempo de carregamento simulado
  }
}
