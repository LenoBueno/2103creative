
import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewTab from '@/components/dashboard/OverviewTab';
import TabContent from '@/components/dashboard/TabContent';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  return (
    <div className="space-y-6 w-full max-w-full">
      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <DashboardHeader isRefreshing={isRefreshing} handleRefresh={handleRefresh} />
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="finance" className="space-y-4">
          <TabContent title="Financeira" />
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <TabContent title="de Vendas" />
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <TabContent title="de Estoque" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
