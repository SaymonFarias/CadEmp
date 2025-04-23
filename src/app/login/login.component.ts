import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false, // Definido como false
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);
    // Adicione a lógica de autenticação aqui
  }
}
