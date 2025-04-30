import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  empresa = {
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    site: '',
    regime_tributario: '',
    cnae_principal: '',
    data_abertura: ''
  };

  erros = {
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    site: '',
    regime_tributario: '',
    cnae_principal: '',
    data_abertura: ''
  };

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  regimesTributarios = ['Simples Nacional', 'Lucro Presumido', 'Lucro Real', 'MEI'];

  today: string = '';

  constructor() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  validarRazaoSocial() {
    if (!this.empresa.razao_social) {
      this.erros.razao_social = 'Informe a Razão Social da empresa';
    } else if (this.empresa.razao_social.length > 255) {
      this.erros.razao_social = 'A Razão Social deve ter no máximo 255 caracteres';
    } else {
      this.erros.razao_social = '';
    }
  }

  preencherNomeFantasia() {
    if (!this.empresa.nome_fantasia) {
      this.empresa.nome_fantasia = this.empresa.razao_social;
    }
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  aplicarMascaraCNPJ(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 14) {
      valor = valor.substring(0, 14); // Limita a 14 dígitos
    }

    // Aplica a máscara: 00.000.000/0000-00
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (valor.length > 8) {
      valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (valor.length > 12) {
      valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.cnpj = valor; // Atualiza o modelo
  }

  aplicarMascaraInscricaoEstadual(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 10) {
      valor = valor.substring(0, 10); // Limita a 10 dígitos
    }

    // Aplica a máscara: 00.000.000-0
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (valor.length > 8) {
      valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.inscricao_estadual = valor; // Atualiza o modelo
  }

  aplicarMascaraInscricaoMunicipal(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 9) {
      valor = valor.substring(0, 9); // Limita a 9 dígitos
    }

    // Aplica a máscara: 00.00000-0
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (valor.length > 7) {
      valor = valor.replace(/^(\d{2})\.(\d{5})(\d)/, '$1.$2-$3');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.inscricao_municipal = valor; // Atualiza o modelo
  }

  aplicarMascaraCEP(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 8) {
      valor = valor.substring(0, 8); // Limita a 8 dígitos
    }

    // Aplica a máscara: 00000-000
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.cep = valor; // Atualiza o modelo
  }

  aplicarMascaraCNAE(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 7) {
      valor = valor.substring(0, 7); // Limita a 7 dígitos
    }

    // Aplica a máscara: 0000-0/00
    if (valor.length > 4) {
      valor = valor.replace(/^(\d{4})(\d)/, '$1-$2');
    }
    if (valor.length > 6) {
      valor = valor.replace(/^(\d{4}-\d)(\d)/, '$1/$2');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.cnae_principal = valor; // Atualiza o modelo
  }

  aplicarMascaraTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length > 11) {
      valor = valor.substring(0, 11); // Limita a 11 dígitos
    }

    // Aplica a máscara: (99) 99999-9999
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    }
    if (valor.length > 7) {
      valor = valor.replace(/^(\(\d{2}\) \d{4})(\d)/, '$1-$2');
    }

    input.value = valor; // Atualiza o valor do campo
    this.empresa.telefone = valor; // Atualiza o modelo
  }

  salvar() {
    console.log('Empresa salva:', this.empresa);
  }

  excluir() {
    console.log('Empresa excluída');
  }
}
