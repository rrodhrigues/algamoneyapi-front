import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

  if(typeof errorResponse === 'string')
      msg = errorResponse;
    else if (typeof errorResponse === 'object') {
      let errors: any;

      if (errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        try {
          errors = errorResponse.json();
          msg = errors[0].mensagemUsuario;
        } catch(e){}
      }
      msg = 'Erro ao processar serviço remoto, contate o administrador do sistema!!!';
      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto, contate o administrador do sistema!!!';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }



}
