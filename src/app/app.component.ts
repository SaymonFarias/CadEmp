import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false, // Adicionado explicitamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'empresa-app';
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

  ngOnInit() {
    // Foco automático no campo Razão Social ao carregar a tela
    setTimeout(() => {
      const razaoSocialInput = document.querySelector('input[name="razao_social"]') as HTMLInputElement;
      razaoSocialInput?.focus();
    }, 0);

    // Define a data atual no formato YYYY-MM-DD
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

  validarCNPJ() {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const apenasNumerosRegex = /^\d+$/;

    if (!this.empresa.cnpj) {
      this.erros.cnpj = 'CNPJ inválido ou já cadastrado';
    } else if (!apenasNumerosRegex.test(this.empresa.cnpj.replace(/\D/g, ''))) {
      this.erros.cnpj = 'CNPJ deve conter apenas números';
    } else if (!cnpjRegex.test(this.empresa.cnpj)) {
      this.erros.cnpj = 'CNPJ inválido ou já cadastrado';
    } else {
      this.erros.cnpj = '';
      // Simulação de verificação via backend
      console.log('Verificando CNPJ no backend...');
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

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validarInscricaoEstadual() {
    const inscricaoEstadualRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;

    if (this.empresa.inscricao_estadual && this.empresa.inscricao_estadual.length > 10) {
      this.erros.inscricao_estadual = 'Inscrição Estadual deve ter no máximo 10 dígitos';
    } else if (this.empresa.inscricao_estadual && !inscricaoEstadualRegex.test(this.empresa.inscricao_estadual)) {
      this.erros.inscricao_estadual = 'Inscrição Estadual inválida';
    } else {
      this.erros.inscricao_estadual = '';
    }
  }

  validarInscricaoMunicipal() {
    const inscricaoMunicipalRegex = /^\d{2}\.\d{5}-\d{1}$/;

    if (this.empresa.inscricao_municipal && this.empresa.inscricao_municipal.length > 9) {
      this.erros.inscricao_municipal = 'Inscrição Municipal deve ter no máximo 9 dígitos';
    } else if (this.empresa.inscricao_municipal && !inscricaoMunicipalRegex.test(this.empresa.inscricao_municipal)) {
      this.erros.inscricao_municipal = 'Inscrição Municipal inválida';
    } else {
      this.erros.inscricao_municipal = '';
    }
  }

  validarLogradouro() {
    if (!this.empresa.logradouro) {
      this.erros.logradouro = 'Informe o logradouro';
    } else if (this.empresa.logradouro.length > 255) {
      this.erros.logradouro = 'O logradouro deve ter no máximo 255 caracteres';
    } else {
      this.erros.logradouro = '';
    }
  }

  validarNumero() {
    if (!this.empresa.numero) {
      this.erros.numero = 'Número inválido';
    } else if (this.empresa.numero.length > 7) {
      this.erros.numero = 'O número deve ter no máximo 7 caracteres';
    } else {
      this.erros.numero = '';
    }
  }

  validarComplemento() {
    if (this.empresa.complemento && this.empresa.complemento.length > 100) {
      this.erros.complemento = 'O complemento deve ter no máximo 100 caracteres';
    } else {
      this.erros.complemento = '';
    }
  }

  validarBairro() {
    if (!this.empresa.bairro) {
      this.erros.bairro = 'Informe o bairro';
    } else if (this.empresa.bairro.length > 100) {
      this.erros.bairro = 'O bairro deve ter no máximo 100 caracteres';
    } else {
      this.erros.bairro = '';
    }
  }

  validarCidade() {
    if (!this.empresa.cidade) {
      this.erros.cidade = 'Informe a cidade';
    } else if (this.empresa.cidade.length > 100) {
      this.erros.cidade = 'A cidade deve ter no máximo 100 caracteres';
    } else {
      this.erros.cidade = '';
    }
  }

  validarEstado() {
    if (!this.empresa.estado) {
      this.erros.estado = 'Selecione o estado';
    } else if (!this.estados.includes(this.empresa.estado)) {
      this.erros.estado = 'Estado inválido';
    } else {
      this.erros.estado = '';
    }
  }

  validarCEP() {
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!this.empresa.cep) {
      this.erros.cep = 'CEP inválido';
    } else if (!cepRegex.test(this.empresa.cep)) {
      this.erros.cep = 'CEP inválido';
    } else {
      this.erros.cep = '';
    }
  }

  validarTelefone() {
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (this.empresa.telefone && !telefoneRegex.test(this.empresa.telefone)) {
      this.erros.telefone = 'Telefone inválido';
    } else {
      this.erros.telefone = '';
    }
  }

  validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.empresa.email && this.empresa.email.length > 100) {
      this.erros.email = 'O email deve ter no máximo 100 caracteres';
    } else if (this.empresa.email && !emailRegex.test(this.empresa.email)) {
      this.erros.email = 'Email inválido';
    } else {
      this.erros.email = '';
    }
  }

  validarSite() {
    const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (this.empresa.site && !urlRegex.test(this.empresa.site)) {
      this.erros.site = 'Endereço de site inválido';
    } else {
      this.erros.site = '';
    }
  }

  validarRegimeTributario() {
    if (!this.empresa.regime_tributario) {
      this.erros.regime_tributario = 'Selecione o regime tributário';
    } else if (!this.regimesTributarios.includes(this.empresa.regime_tributario)) {
      this.erros.regime_tributario = 'Regime tributário inválido';
    } else {
      this.erros.regime_tributario = '';
    }
  }

  validarCNAEPrincipal() {
    const cnaeRegex = /^\d{4}-\d\/\d{2}$/;

    if (!this.empresa.cnae_principal) {
      this.erros.cnae_principal = 'CNAE inválido';
    } else if (!cnaeRegex.test(this.empresa.cnae_principal)) {
      this.erros.cnae_principal = 'CNAE inválido';
    } else {
      this.erros.cnae_principal = '';
    }
  }

  validarDataAbertura() {
    const hoje = new Date();
    const dataAbertura = new Date(this.empresa.data_abertura);

    if (!this.empresa.data_abertura) {
      this.erros.data_abertura = 'Data de abertura inválida';
    } else if (dataAbertura > hoje) {
      this.erros.data_abertura = 'Data de abertura não pode ser futura';
    } else {
      this.erros.data_abertura = '';
    }
  }

  buscarEnderecoPorCEP() {
    const cep = this.empresa.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      // Simulação de busca de endereço via CEP
      console.log(`Buscando endereço para o CEP: ${cep}`);
      // Exemplo de preenchimento automático
      this.empresa.logradouro = 'Rua Exemplo';
      this.empresa.bairro = 'Bairro Exemplo';
      this.empresa.cidade = 'Cidade Exemplo';
      this.empresa.estado = 'EX';
    }
  }

  salvar() {
    // Validar Razão Social
    if (!this.empresa.razao_social) {
      this.erros.razao_social = 'Informe a Razão Social da empresa';
    } else {
      this.erros.razao_social = '';
    }

    // Validar CNPJ
    this.validarCNPJ();

    // Validar Inscrição Estadual
    this.validarInscricaoEstadual();

    // Validar Inscrição Municipal
    this.validarInscricaoMunicipal();

    this.validarLogradouro();

    this.validarNumero();

    this.validarComplemento();
    this.validarBairro();
    this.validarCidade();
    this.validarEstado();
    this.validarCEP();
    this.validarTelefone();
    this.validarEmail();
    this.validarSite();
    this.validarRegimeTributario();
    this.validarCNAEPrincipal();
    this.validarDataAbertura();

    // Marcar os campos como "dirty" para ativar os estilos de erro
    const formFields = document.querySelectorAll('input');
    formFields.forEach((field) => {
      field.classList.add('ng-dirty');
    });

    if (Object.values(this.erros).some((erro) => erro)) {
      console.error('Erros de validação:', this.erros);
      return;
    }

    console.log('Empresa salva:', this.empresa);
  }

  excluir() {
    console.log('Empresa excluída');
  }
}
