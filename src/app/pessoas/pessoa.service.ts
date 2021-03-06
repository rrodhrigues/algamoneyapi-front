import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Pessoa } from 'app/core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasURl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  async pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    const response = await this.http
      .get(`${this.pessoasURl}`, { headers, search: params })
      .toPromise();
      const responseJson = response.json();
      const pessoas = responseJson.content;
      const resultado = {
        pessoas,
        total: responseJson.totalElements
      };
    return resultado;
  }

  async listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    const respone = await this.http
      .get(this.pessoasURl, { headers })
      .toPromise();
    return respone.json().content;
  }

  async excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    await this.http
      .delete(`${this.pessoasURl}/${codigo}`, { headers })
      .toPromise();
    return null;
  }

  async alterarStatus(pessoa: any, situacao: boolean): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    await this.http
      .put(`${this.pessoasURl}/${pessoa.codigo}/ativo`, situacao, { headers })
      .toPromise();
    return null;
  }

  async adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    const response = await this.http
      .post(this.pessoasURl, JSON.stringify(pessoa), { headers })
      .toPromise();

    return response.json();
  }

  async atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(`${ this.pessoasURl }/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => {
      const pessoaAtualizada = response.json() as Pessoa;    
      return pessoaAtualizada;
    });
  }

  async buscaPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(`${this.pessoasURl}/${codigo}`, {headers} )
      .toPromise()
      .then( response => {
        const pessoa = response.json() as Pessoa;       
        return pessoa;
      });
  }

}
