import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'app/core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  estados = [
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
  constructor() { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoa.ativo = true;

    console.log(this.pessoa);
  }

}
