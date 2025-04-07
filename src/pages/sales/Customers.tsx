
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerListTab from '@/components/sales/customers/CustomerListTab';
import CustomerAnalyticsTab from '@/components/sales/customers/CustomerAnalyticsTab';
import CustomerSegmentsTab from '@/components/sales/customers/CustomerSegmentsTab';

const Customers = () => {
  const navigate = useNavigate();

  const handleNewClient = () => {
    navigate('/sales/client/new');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader 
          title="Clientes" 
          description="Gerenciamento e análise de clientes"
          actions={
            <Button onClick={handleNewClient}>
              <Plus size={16} className="mr-2" />
              Novo Cliente
            </Button>
          }
        />
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Clientes</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
            <TabsTrigger value="segments">Segmentação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <CustomerListTab />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <CustomerAnalyticsTab />
          </TabsContent>
          
          <TabsContent value="segments" className="space-y-4">
            <CustomerSegmentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Customers;
