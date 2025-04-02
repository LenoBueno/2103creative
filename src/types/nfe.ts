
export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  pais?: string;
  codigoPais?: string;
}

export interface Volume {
  quantidade: number;
  especie?: string;
  marca?: string;
  numeracao?: string;
  pesoLiquido?: number;
  pesoBruto?: number;
}

export interface TributosItem {
  icms: {
    cst: string;
    aliquota: number;
    baseCalculo: number;
    valor: number;
    st?: {
      mva: number;
      aliquota: number;
      baseCalculo: number;
      valor: number;
    };
  };
  pis: { 
    cst: string; 
    aliquota: number;
    baseCalculo: number;
    valor: number;
  };
  cofins: { 
    cst: string; 
    aliquota: number;
    baseCalculo: number;
    valor: number;
  };
  ipi?: {
    cst: string;
    aliquota: number;
    baseCalculo: number;
    valor: number;
  };
}

export interface NFe {
  id: string;
  numero: number;
  serie: string;
  modelo: '55' | '65';
  dataEmissao: string;
  naturezaOperacao: string;
  emitente: {
    cnpj: string;
    inscricaoEstadual: string;
    nome: string;
    nomeFantasia?: string;
    endereco: Endereco;
  };
  destinatario: {
    tipo: 'CPF' | 'CNPJ';
    numero: string;
    nome: string;
    inscricaoEstadual?: string;
    endereco: Endereco;
    email?: string;
  };
  itens: Array<{
    codigo: string;
    descricao: string;
    ncm: string;
    cfop: string;
    unidade: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    tributos: TributosItem;
  }>;
  transporte: {
    modalidade: number;
    volumes?: Array<Volume>;
    transportadora?: {
      cnpj?: string;
      cpf?: string;
      nome: string;
      inscricaoEstadual?: string;
      endereco?: Endereco;
    };
    veiculo?: {
      placa: string;
      uf: string;
    };
  };
  pagamento: {
    forma: '01' | '02' | '03' | '04' | '05' | '10' | '15' | '90'; // 01=Dinheiro, 02=Cheque, 03=CC, etc.
    valor: number;
    parcelas?: Array<{
      numero: number;
      vencimento: string;
      valor: number;
    }>;
  };
  informacoesAdicionais?: string;
  status: 'rascunho' | 'processando' | 'autorizada' | 'rejeitada' | 'cancelada';
  chaveAcesso?: string;
  protocoloAutorizacao?: string;
  protocoloCancelamento?: string;
}
