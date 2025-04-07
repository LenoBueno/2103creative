
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerSegmentsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Segmentação por Volume</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center bg-erp-gray-50">
          <p className="text-sm text-erp-gray-500">Gráfico de segmentação</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Segmentação por Região</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center bg-erp-gray-50">
          <p className="text-sm text-erp-gray-500">Gráfico de segmentação</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Segmentação por Produto</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center bg-erp-gray-50">
          <p className="text-sm text-erp-gray-500">Gráfico de segmentação</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSegmentsTab;
