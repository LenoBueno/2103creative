
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Save, Send, Download } from "lucide-react";
import { set, get } from 'lodash';
import { NFe } from '@/types/nfe';

import DadosBasicosForm from "./DadosBasicosForm";
import ItensForm from "./ItensForm";
import TransporteForm from "./TransporteForm";
import PagamentoForm from "./PagamentoForm";
import RevisaoForm from "./RevisaoForm";

// Funções auxiliares para trabalhar com objetos aninhados
const setNestedValue = (obj: any, path: string, value: any) => {
  return set(obj, path, value);
};

const getNestedValue = (obj: any, path: string) => {
  return get(obj, path);
};

const NFeWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dados_basicos");
  
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
    itens: [],
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
  const handleAddItem = (item: any) => {
    setNfe(prev => ({
      ...prev,
      itens: [...(prev.itens || []), item]
    }));
  };

  const handleUpdateItem = (updatedItem: any) => {
    setNfe(prev => ({
      ...prev,
      itens: prev.itens?.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
  };

  const handleRemoveItem = (id: string) => {
    setNfe(prev => ({
      ...prev,
      itens: prev.itens?.filter(item => item.id !== id)
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

  const handlePrevStep = () => {
    switch (activeTab) {
      case "itens":
        setActiveTab("dados_basicos");
        break;
      case "transporte":
        setActiveTab("itens");
        break;
      case "pagamento":
        setActiveTab("transporte");
        break;
      case "revisao":
        setActiveTab("pagamento");
        break;
      default:
        break;
    }
  };

  const handleNextStep = () => {
    // Validação básica antes de avançar
    switch (activeTab) {
      case "dados_basicos":
        if (!nfe.destinatario?.nome || !nfe.destinatario?.numero) {
          toast({
            title: "Dados incompletos",
            description: "Preencha os dados do destinatário",
            variant: "destructive"
          });
          return;
        }
        setActiveTab("itens");
        break;
      case "itens":
        if (!nfe.itens?.length) {
          toast({
            title: "Itens ausentes",
            description: "Adicione pelo menos um item à nota fiscal",
            variant: "destructive"
          });
          return;
        }
        setActiveTab("transporte");
        break;
      case "transporte":
        setActiveTab("pagamento");
        break;
      case "pagamento":
        setActiveTab("revisao");
        break;
      default:
        break;
    }
  };

  const handleSaveDraft = () => {
    // Aqui você implementaria a lógica para salvar o rascunho
    console.log("Salvando rascunho:", nfe);
    toast({
      title: "Rascunho salvo",
      description: "Os dados da NF-e foram salvos como rascunho"
    });
  };

  const handleEmitirNFe = () => {
    // Aqui você implementaria a lógica para emitir a NF-e
    console.log("Emitindo NF-e:", nfe);
    
    // Simulação de emissão bem-sucedida
    setTimeout(() => {
      toast({
        title: "NF-e emitida com sucesso!",
        description: "Nota fiscal autorizada pela SEFAZ"
      });
      
      // Atualizar o estado com informações da NF-e autorizada
      setNfe(prev => ({
        ...prev,
        status: 'autorizada',
        chaveAcesso: '43210612345678000199550010000001021000001029',
        protocoloAutorizacao: '123456789012345'
      }));
    }, 2000);
  };

  const renderStepButtons = () => (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={handlePrevStep}
        disabled={activeTab === "dados_basicos"}
        className="gap-1"
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          className="gap-1"
        >
          <Save size={16} />
          Salvar Rascunho
        </Button>
        
        {activeTab === "revisao" ? (
          <Button onClick={handleEmitirNFe} className="gap-1">
            <Send size={16} />
            Emitir NF-e
          </Button>
        ) : (
          <Button onClick={handleNextStep} className="gap-1">
            Próximo
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: "dados_basicos", label: "Dados Básicos" },
    { id: "itens", label: "Itens" },
    { id: "transporte", label: "Transporte" },
    { id: "pagamento", label: "Pagamento" },
    { id: "revisao", label: "Revisão" }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              disabled={
                // Desabilita abas futuras até que chegue a elas
                (tab.id === "itens" && !nfe.destinatario?.nome) ||
                (tab.id === "transporte" && (!nfe.itens?.length)) ||
                (tab.id === "pagamento" && tab.id === "pagamento") ||
                (tab.id === "revisao" && tab.id === "revisao")
              }
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="dados_basicos">
            <DadosBasicosForm 
              values={nfe}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          
          <TabsContent value="itens">
            <ItensForm 
              itens={nfe.itens || []}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
            />
          </TabsContent>
          
          <TabsContent value="transporte">
            <TransporteForm 
              values={nfe}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          
          <TabsContent value="pagamento">
            <PagamentoForm 
              values={nfe}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              updateParcelas={updateParcelas}
              totalNota={totalNota}
            />
          </TabsContent>
          
          <TabsContent value="revisao">
            <RevisaoForm 
              nfe={nfe}
              handleChange={handleChange}
            />
          </TabsContent>
        </div>
      </Tabs>

      {renderStepButtons()}
      
      {nfe.status === 'autorizada' && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Baixar DANFE
          </Button>
        </div>
      )}
    </div>
  );
};

export default NFeWizard;
