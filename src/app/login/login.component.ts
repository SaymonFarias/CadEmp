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
        this.router.navigate(['/inicio']); // Redireciona para a página de boas-vindas
      }, 500);
    }, 3000);
  }
}
