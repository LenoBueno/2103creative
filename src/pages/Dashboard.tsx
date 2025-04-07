
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PerformanceCards from "@/components/dashboard/PerformanceCards";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SalesChart from "@/components/dashboard/SalesChart";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHeader 
          isRefreshing={isRefreshing} 
          handleRefresh={handleRefresh} 
        />
        <PerformanceCards />
        <Tabs defaultValue="overview" className="w-full">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OverviewTab />
              <SalesChart />
            </div>
          </TabsContent>
          <TabsContent value="finance">
            <div className="grid grid-cols-1 gap-6">
              <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Conteúdo do painel financeiro em construção...</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sales">
            <div className="grid grid-cols-1 gap-6">
              <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Conteúdo do painel de vendas em construção...</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="inventory">
            <div className="grid grid-cols-1 gap-6">
              <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Conteúdo do painel de estoque em construção...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
