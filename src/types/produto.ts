
export interface ProdutoImpostosST {
  mva: number;
  aliquota: number;
}

export interface ProdutoImpostosICMS {
  cst: string;
  aliquota: number;
  st?: ProdutoImpostosST;
}

export interface ProdutoImpostosPisCofins {
  cst: string;
  aliquota: number;
}

export interface ProdutoImpostos {
  icms: ProdutoImpostosICMS;
  pis: ProdutoImpostosPisCofins;
  cofins: ProdutoImpostosPisCofins;
}

export interface ProdutoConfigEstadoRS {
  difal: boolean;
  aliquotaInterna: number;
}

export interface ProdutoConfigEstado {
  RS?: ProdutoConfigEstadoRS;
  SP?: Record<string, any>;
}

export interface Produto {
  id: string;
  codigo: string;
  descricao: string;
  detalhes?: string;
  preco: number;
  unidade: 'UN' | 'KG' | 'LT' | 'M';
  grupo: string;
  estoque: number;
  estoque_status?: 'low' | 'medium' | 'high' | 'none';
  valor?: number;
  
  // Dados Fiscais
  ncm: string;
  cest?: string;
  origem: string;
  impostos: ProdutoImpostos;
  
  // Dados específicos por estado
  configEstado: ProdutoConfigEstado;
}
