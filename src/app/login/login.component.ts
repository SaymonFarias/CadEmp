import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, // Definido como false
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

    // Exibe o loading
    this.isLoading = true;

    // Simula o carregamento por 3 segundos
    setTimeout(() => {
      this.isLoading = false;
      this.isTransitioning = true; // Inicia a transição

      // Aguarda a animação de transição antes de redirecionar
      setTimeout(() => {
        this.router.navigate(['/form']); // Redireciona para a página de formulário
      }, 500); // Tempo da animação (0.5s)
    }, 3000);
  }
}
