
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const CustomerAnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <BarChart size={18} className="mr-2" />
          Mapa de Calor de Compras
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center bg-erp-gray-50">
        <p className="text-sm text-erp-gray-500">Mapa de calor em construção...</p>
      </CardContent>
    </Card>
  );
};

export default CustomerAnalyticsTab;
