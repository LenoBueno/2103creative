import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ClipboardEdit, PieChart, Plus } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { PageTransition } from '@/components/ui/page-transition';
import { Button } from '@/components/ui/button';
import AccountingLedger from '@/components/finance/accounting/AccountingLedger';
import AccountingJournal from '@/components/finance/accounting/AccountingJournal';
import AccountingReports from '@/components/finance/accounting/AccountingReports';

const Accounting = () => {
  const [activeTab, setActiveTab] = useState('ledger');
  const navigate = useNavigate();

  const handleNewEntry = () => {
    navigate('/finance/accounting/new');
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Contabilidade</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie os lançamentos contábeis e visualize relatórios financeiros.
              </p>
            </div>
            <Button 
              onClick={handleNewEntry}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Novo Lançamento
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ledger" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Livro Razão
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <ClipboardEdit className="h-4 w-4" />
                Diário
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ledger" className="mt-0">
              <AccountingLedger showNewEntryButton={false} />
            </TabsContent>
            
            <TabsContent value="journal" className="mt-0">
              <AccountingJournal showNewEntryButton={false} />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <AccountingReports />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Accounting;
