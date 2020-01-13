import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { CategoriaService } from "app/categoria/categoria.service";
import { ErrorHandlerService } from "app/core/error-handler.service";
import { PessoaService } from "app/pessoas/pessoa.service";
import { Lancamento } from "app/core/model";
import { LancamentoService } from "../lancamento.service";

import { ToastyService } from "ng2-toasty";

@Component({
  selector: "app-lancamento-cadastro",
  templateUrl: "./lancamento-cadastro.component.html",
  styleUrls: ["./lancamento-cadastro.component.css"]
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoServie: LancamentoService,
    private toasty: ToastyService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl): void {
    // console.log(this.lancamento);
    this.lancamentoServie.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService
      .listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({
          label: c.nome,
          value: c.codigo
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService
      .listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({
          label: p.nome,
          value: p.codigo
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
