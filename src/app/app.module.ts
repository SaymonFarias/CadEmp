import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'form', component: FormComponent } // Página de formulário
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // Configuração das rotas
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
