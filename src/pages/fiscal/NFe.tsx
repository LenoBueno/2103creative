
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import NFeWizard from '@/components/fiscal/nfe/NFeWizard';
import { Book } from 'lucide-react';

const NFePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Emissão de Nota Fiscal Eletrônica"
          description="Emissão de NF-e / NFC-e com integração SEFAZ"
          icon={<Book className="h-6 w-6" />}
        />
        
        <NFeWizard />
      </div>
    </MainLayout>
  );
};

export default NFePage;
