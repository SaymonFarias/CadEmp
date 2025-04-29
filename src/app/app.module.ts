import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login sem a barra lateral
  {
    path: '',
    component: SidebarComponent, // Barra lateral encapsula as demais rotas
    children: [
      { path: 'form', component: FormComponent } // Página de formulário
    ]
  },
  { path: '**', redirectTo: '/login' } // Redireciona para login se a rota não for encontrada
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
