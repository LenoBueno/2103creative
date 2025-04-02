
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WizardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  isTabDisabled: (tabId: string) => boolean;
}

const WizardTabs = ({ activeTab, onTabChange, isTabDisabled }: WizardTabsProps) => {
  const tabs = [
    { id: "dados_basicos", label: "Dados Básicos" },
    { id: "itens", label: "Itens" },
    { id: "transporte", label: "Transporte" },
    { id: "pagamento", label: "Pagamento" },
    { id: "revisao", label: "Revisão" }
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        {tabs.map(tab => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            disabled={isTabDisabled(tab.id)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default WizardTabs;
