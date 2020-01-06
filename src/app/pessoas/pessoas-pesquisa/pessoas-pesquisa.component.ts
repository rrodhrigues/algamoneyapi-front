import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PessoaService, PessoaFiltro } from '../pessoa.service';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

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
              private errorHandlerService: ErrorHandlerService) {}

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
        this.desativar(pessoa);
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

  desativar(pessoa: any) {
    pessoa.ativo = (pessoa.ativo === true) ? false : true;

    this.pessoaService.desativar(pessoa)
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
