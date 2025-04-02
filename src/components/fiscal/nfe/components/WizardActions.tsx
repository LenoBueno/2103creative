
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NFe } from '@/types/nfe';
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Save, Send, Download } from "lucide-react";

interface WizardActionsProps {
  activeTab: string;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  nfe: Partial<NFe>;
  onSaveDraft: () => void;
  onEmitNFe: () => void;
}

const WizardActions = ({ 
  activeTab, 
  handlePrevStep, 
  handleNextStep, 
  nfe, 
  onSaveDraft, 
  onEmitNFe 
}: WizardActionsProps) => {
  return (
    <div className="space-y-4">
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
            onClick={onSaveDraft}
            className="gap-1"
          >
            <Save size={16} />
            Salvar Rascunho
          </Button>
          
          {activeTab === "revisao" ? (
            <Button onClick={onEmitNFe} className="gap-1">
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

export default WizardActions;
