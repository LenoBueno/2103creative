
export interface Lancamento {
  id: number;
  data: Date;
  documento: string;
  conta_id: number;
  descricao: string;
  debito: number;
  credito: number;
  valor: number;
  tipo: 'receita' | 'despesa' | 'transferencia';
  status: 'pendente' | 'confirmado' | 'cancelado';
  created_at: Date;
  updated_at: Date;
}

export interface LancamentoDTO {
  id?: number;
  data: string;
  documento: string;
  conta_id: number;
  descricao: string;
  debito?: number;
  credito?: number;
  valor: number;
  tipo: 'receita' | 'despesa' | 'transferencia';
  status: 'pendente' | 'confirmado' | 'cancelado';
}

export interface ContaContabil {
  id: number;
  codigo: string;
  descricao: string;
  tipo: string;
  natureza: 'devedora' | 'credora';
  pai_id: number | null;
  saldo: number;
  created_at: Date;
  updated_at: Date;
}
