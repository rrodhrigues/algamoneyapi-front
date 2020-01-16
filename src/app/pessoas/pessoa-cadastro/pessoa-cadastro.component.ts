import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'app/core/model';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados = [];

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarEstados();
  }

  salvar(form: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!');

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));

    console.log(this.pessoa);
  }

  carregarEstados() {
    this.estados = [
      {label: 'São Paulo', value: 'SÃO PAULO'},
      {label: 'Rio de Janeio', value: 'RIO DE JANEIRO'},
      {label: 'Minas Gerais', value: 'MINAS GERAIS'},
      {label: 'Tocantis', value: 'TOCANTIS'},
      {label: 'Ceará', value: 'CEARÁ'},
      {label: 'Acre', value: 'ACRE'},
      {label: 'Santa Catarina', value: 'SANTA CATARINA'},
      {label: 'Goias', value: 'Goias'},
      {label: 'Bahia', value: 'Bahia'},
      {label: 'Mato Grosso do Sul', value: 'MATO GROSSO DO SUL'},
      {label: 'Mato Grosso', value: 'MATO GROSSO'}
    ]
  }

}
