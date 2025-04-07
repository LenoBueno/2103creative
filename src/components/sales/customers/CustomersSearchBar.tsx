
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Filter, Search } from 'lucide-react';

const CustomersSearchBar = () => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="pl-8 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Buscar cliente..."
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <Filter size={14} className="mr-1" />
          Filtros
        </Button>
        <Button size="sm" variant="outline">
          <FileText size={14} className="mr-1" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default CustomersSearchBar;
