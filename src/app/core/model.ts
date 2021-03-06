export class Categoria {
  codigo: number;
}
export class Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}
export class Lancamento {
  codigo: number;
  tipo: string = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
