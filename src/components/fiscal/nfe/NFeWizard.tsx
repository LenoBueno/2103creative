
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Item } from '@/types/nfe';

import { useNFeState } from './hooks/useNFeState';
import { useWizardNavigation } from './hooks/useWizardNavigation';
import WizardTabs from './components/WizardTabs';
import WizardActions from './components/WizardActions';

import DadosBasicosForm from "./DadosBasicosForm";
import ItensForm from "./ItensForm";
import TransporteForm from "./TransporteForm";
import PagamentoForm from "./PagamentoForm";
import RevisaoForm from "./RevisaoForm";

const NFeWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    nfe, 
    setNfe, 
    totalNota, 
    handleChange, 
    handleSelectChange,
    handleAddItem,
    handleUpdateItem,
    handleRemoveItem,
    updateParcelas
  } = useNFeState();

  const { 
    activeTab, 
    setActiveTab, 
    handlePrevStep, 
    handleNextStep, 
    isStepDisabled 
  } = useWizardNavigation({ nfe });

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

  return (
    <div className="space-y-6">
      <WizardTabs 
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as any)}
        isTabDisabled={(tabId) => isStepDisabled(tabId as any)}
      />
      
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
            itens={nfe.itens as Item[] || []}
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

      <WizardActions 
        activeTab={activeTab}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        nfe={nfe}
        onSaveDraft={handleSaveDraft}
        onEmitNFe={handleEmitirNFe}
      />
    </div>
  );
};

export default NFeWizard;
