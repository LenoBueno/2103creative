
export interface Cliente {
  id: number;
  codigo: string;
  nome: string;
  cnpj_cpf: string;
  email: string;
  telefone: string;
  contato_nome: string;
  contato_telefone: string;
  cidade: string;
  uf: string;
  cep: string;
  score: 'A+' | 'A' | 'B' | 'C' | 'D';
  valor_total: number;
  data_cadastro: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ClienteDTO {
  id?: number;
  codigo: string;
  nome: string;
  cnpj_cpf: string;
  email?: string;
  telefone?: string;
  contato_nome?: string;
  contato_telefone?: string;
  cidade: string;
  uf: string;
  cep?: string;
  score?: 'A+' | 'A' | 'B' | 'C' | 'D';
}

export interface Pedido {
  id: number;
  numero: string;
  data: Date;
  cliente_id: number;
  valor_total: number;
  status: 'novo' | 'aprovado' | 'em_separacao' | 'faturado' | 'concluido' | 'cancelado';
  items_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface PedidoDTO {
  id?: number;
  numero?: string;
  data: string;
  cliente_id: number;
  items: PedidoItemDTO[];
  status?: 'novo' | 'aprovado' | 'em_separacao' | 'faturado' | 'concluido' | 'cancelado';
}

export interface PedidoItem {
  id: number;
  pedido_id: number;
  produto_id: number;
  descricao: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  created_at: Date;
  updated_at: Date;
}

export interface PedidoItemDTO {
  id?: number;
  produto_id: number;
  descricao?: string;
  quantidade: number;
  valor_unitario: number;
}
