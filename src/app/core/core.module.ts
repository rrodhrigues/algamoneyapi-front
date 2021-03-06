import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { ToastyModule } from "ng2-toasty";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";

import { LancamentoService } from "./../lancamentos/lancamento.service";
import { PessoaService } from "./../pessoas/pessoa.service";
import { ConfirmationService } from "primeng/components/common/api";
import { CategoriaService } from "app/categoria/categoria.service";
import { RouterModule } from "@angular/router";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class CoreModule { }
