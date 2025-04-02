
import { useState, useEffect } from 'react';
import { NFe, Item } from '@/types/nfe';
import { v4 as uuidv4 } from 'uuid';
import { set, get } from 'lodash';

// Funções auxiliares para trabalhar com objetos aninhados
const setNestedValue = (obj: any, path: string, value: any) => {
  return set(obj, path, value);
};

const getNestedValue = (obj: any, path: string) => {
  return get(obj, path);
};

export const useNFeState = () => {
  // Estado para armazenar os dados da NF-e
  const [nfe, setNfe] = useState<Partial<NFe>>({
    modelo: '55',
    serie: '1',
    naturezaOperacao: 'Venda de Mercadoria',
    emitente: {
      cnpj: '12345678000199',
      inscricaoEstadual: '12345678',
      nome: 'Empresa Teste',
      endereco: {
        logradouro: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
        cep: '01001000'
      }
    },
    destinatario: {
      tipo: 'CNPJ',
      numero: '',
      nome: '',
      endereco: {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      }
    },
    itens: [] as Item[],
    transporte: {
      modalidade: 9
    },
    pagamento: {
      forma: '01',
      valor: 0
    },
    status: 'rascunho'
  });

  // Controlador de alterações em campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNfe(prev => {
      return setNestedValue({...prev}, name, value);
    });
  };

  // Controlador para selects
  const handleSelectChange = (field: string, value: string) => {
    setNfe(prev => {
      return setNestedValue({...prev}, field, value);
    });
  };

  // Controladores para itens
  const handleAddItem = (item: Omit<Item, 'id'>) => {
    const newItem: Item = {
      ...item,
      id: uuidv4() // Garantir que cada item tenha um ID único
    };
    
    setNfe(prev => ({
      ...prev,
      itens: [...(prev.itens || []) as Item[], newItem]
    }));
  };

  const handleUpdateItem = (updatedItem: Item) => {
    setNfe(prev => ({
      ...prev,
      itens: (prev.itens as Item[] || []).map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
  };

  const handleRemoveItem = (id: string) => {
    setNfe(prev => ({
      ...prev,
      itens: (prev.itens as Item[] || []).filter(item => item.id !== id)
    }));
  };

  // Controlador para parcelas
  const updateParcelas = (parcelas: any[]) => {
    setNfe(prev => ({
      ...prev,
      pagamento: {
        ...prev.pagamento!,
        parcelas
      }
    }));
  };

  // Valor total da nota
  const totalNota = nfe.itens?.reduce((total, item) => total + item.valorTotal, 0) || 0;

  // Atualiza o valor do pagamento automaticamente
  useEffect(() => {
    setNfe(prev => ({
      ...prev,
      pagamento: {
        ...prev.pagamento!,
        valor: totalNota
      }
    }));
  }, [totalNota]);

  return {
    nfe,
    setNfe,
    totalNota,
    handleChange,
    handleSelectChange,
    handleAddItem,
    handleUpdateItem,
    handleRemoveItem,
    updateParcelas
  };
};
