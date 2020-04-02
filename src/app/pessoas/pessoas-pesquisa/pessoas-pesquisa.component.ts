import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private errorHandlerService: ErrorHandlerService, 
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this. filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
        // console.log(this.pessoas);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
    // console.log(event);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        // this.excluir(pessoa);
        this.alterarStatus(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0)
          this.pesquisar();
        else
          this.grid.first = 0;

        this.toasty.success('Pessoa excluida com sucesso!');
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  alterarStatus(pessoa: any) {
    const situacao: boolean = (pessoa.ativo === true) ? false : true;

    this.pessoaService.alterarStatus(pessoa, situacao)
      .then(() => {
        if (this.grid.first === 0)
          this.pesquisar();
        else
          this.grid.first = 0;

        this.toasty.success('Pessoa excluida com sucesso!');
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
