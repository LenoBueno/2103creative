
import { RefreshCw, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/common/PageHeader';

interface DashboardHeaderProps {
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const DashboardHeader = ({ isRefreshing, handleRefresh }: DashboardHeaderProps) => {
  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Visão geral do seu negócio"
        actions={
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center"
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button size="sm" className="flex items-center">
              <Plus className="mr-1 h-4 w-4" />
              Adicionar Widget
            </Button>
          </div>
        }
      />
      
      <div className="flex items-center justify-between mb-2">
        <TabsList className="mb-0">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="finance">Financeiro</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
        </TabsList>
        <Button variant="ghost" size="sm" className="flex items-center text-muted-foreground">
          <Filter className="mr-1 h-4 w-4" />
          Filtros
        </Button>
      </div>
    </>
  );
};

export default DashboardHeader;
