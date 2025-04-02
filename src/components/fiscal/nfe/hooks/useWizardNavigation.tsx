
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { NFe } from '@/types/nfe';

type WizardStep = "dados_basicos" | "itens" | "transporte" | "pagamento" | "revisao";

interface ValidationOptions {
  nfe: Partial<NFe>;
}

export const useWizardNavigation = ({ nfe }: ValidationOptions) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<WizardStep>("dados_basicos");

  const validateStep = (step: WizardStep): boolean => {
    switch (step) {
      case "dados_basicos":
        if (!nfe.destinatario?.nome || !nfe.destinatario?.numero) {
          toast({
            title: "Dados incompletos",
            description: "Preencha os dados do destinatário",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case "itens":
        if (!nfe.itens?.length) {
          toast({
            title: "Itens ausentes",
            description: "Adicione pelo menos um item à nota fiscal",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

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
        if (validateStep("dados_basicos")) {
          setActiveTab("itens");
        }
        break;
      case "itens":
        if (validateStep("itens")) {
          setActiveTab("transporte");
        }
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

  const isStepDisabled = (stepId: WizardStep): boolean => {
    switch (stepId) {
      case "itens":
        return !nfe.destinatario?.nome;
      case "transporte":
        return !nfe.itens?.length;
      case "pagamento":
      case "revisao":
        return stepId === activeTab ? false : true;
      default:
        return false;
    }
  };

  return {
    activeTab,
    setActiveTab,
    handlePrevStep,
    handleNextStep,
    isStepDisabled
  };
};
