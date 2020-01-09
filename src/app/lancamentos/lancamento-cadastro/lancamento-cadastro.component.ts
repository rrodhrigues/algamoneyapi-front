import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CategoriaService } from "app/categoria/categoria.service";
import { ErrorHandlerService } from "app/core/error-handler.service";
import { PessoaService } from "app/pessoas/pessoa.service";

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

  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService,
              private pessoaService: PessoaService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm): void {
    console.log(form.value.observacao);
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

