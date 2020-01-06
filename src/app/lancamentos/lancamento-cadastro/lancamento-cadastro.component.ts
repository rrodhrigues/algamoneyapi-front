import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CategoriaService } from "app/categoria/categoria.service";
import { ErrorHandlerService } from "app/core/error-handler.service";

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

  pessoas = [
    { label: "João da Silva", value: 4 },
    { label: "Sebastião Souza", value: 9 },
    { label: "Maria Abadia", value: 3 }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
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
}

