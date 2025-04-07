
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import CustomersSearchBar from './CustomersSearchBar';
import CustomersTable from './CustomersTable';

const CustomerListTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Users size={18} className="mr-2" />
          Cadastro 360°
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CustomersSearchBar />
        <CustomersTable />
      </CardContent>
    </Card>
  );
};

export default CustomerListTab;
