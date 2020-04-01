import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from 'app/core/model';
import { PessoaService } from '../pessoa.service';
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
              private errorHandler: ErrorHandlerService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.carregarEstados();
    
    const codigoPessoa = this.route.snapshot.params['codigo']; 
    if (codigoPessoa) {
      this.carregarPessoas(codigoPessoa);
    }
  }

  get editando() {
    return Boolean (this.pessoa.codigo); 
  }

  carregarPessoas(codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa; 
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  novo(form: FormControl) {
    form.reset();
    
    setTimeout(function() {
      this.pessoa = new Pessoa(); 
    }.bind(this),1);

    this.router.navigate(['/pessoas/novo']);
  }

  adicionarPessoa(form: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
      .then((pessoaAdicionada) => {
        this.toasty.success('Pessoa adicionada com sucesso!');

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));

    console.log(this.pessoa);
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.toasty.success('Pessoa alterada com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
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
