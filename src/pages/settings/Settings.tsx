
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Receipt, Users, Mail } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('fiscal');

  // Update active tab based on URL path
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && ['fiscal', 'users', 'email'].includes(path)) {
      setActiveTab(path);
    }
  }, [location.pathname]);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    navigate(`/settings/${tabValue}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Configurações"
          description="Gerencie as configurações do sistema"
        />
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="fiscal" className="flex items-center gap-2">
              <Receipt size={16} />
              <span className="hidden sm:inline">Fiscal</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
          </TabsList>
          
          <Outlet />
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
