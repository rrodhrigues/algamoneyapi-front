import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      const data = moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD');
      params.set('dataVencimentoDe', data);
    }

    if (filtro.dataVencimentoFim) {
      const data = moment(filtro.dataVencimentoFim).format('YYYY-MM-DD');
      params.set('dataVencimentoAte', data);
    }

    return this.http
      .get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
      .toPromise()
      .then(response => response.json().content)
  }

}
