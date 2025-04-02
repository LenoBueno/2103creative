
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow
} from '@/components/ui/table';
import { 
  Sheet, SheetContent, SheetDescription, 
  SheetHeader, SheetTitle 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Eye, Download, FileCog, FileSearch, Receipt } from 'lucide-react';

const mockNotas = [
  { 
    id: '1', 
    numero: '000001', 
    serie: '1', 
    dataEmissao: '2023-06-10', 
    destinatario: { nome: 'Empresa ABC Ltda', numero: '12.345.678/0001-99' },
    valor: 1250.75,
    status: 'autorizada',
    chaveAcesso: '43230612345678000199550010000001021000001029'
  },
  { 
    id: '2', 
    numero: '000002', 
    serie: '1', 
    dataEmissao: '2023-06-12', 
    destinatario: { nome: 'Cliente Final', numero: '123.456.789-00' },
    valor: 458.99,
    status: 'autorizada',
    chaveAcesso: '43230612345678000199550010000001022000001030'
  },
  { 
    id: '3', 
    numero: '000003', 
    serie: '1', 
    dataEmissao: '2023-06-15', 
    destinatario: { nome: 'Fornecedor XYZ', numero: '98.765.432/0001-88' },
    valor: 2750.00,
    status: 'cancelada',
    chaveAcesso: '43230612345678000199550010000001023000001031'
  },
  { 
    id: '4', 
    numero: '-', 
    serie: '1', 
    dataEmissao: '2023-06-17', 
    destinatario: { nome: 'Comércio A', numero: '45.678.901/0001-77' },
    valor: 899.50,
    status: 'rascunho'
  },
  { 
    id: '5', 
    numero: '000004', 
    serie: '1', 
    dataEmissao: '2023-06-18', 
    destinatario: { nome: 'Indústria B', numero: '34.567.890/0001-66' },
    valor: 3450.25,
    status: 'autorizada',
    chaveAcesso: '43230612345678000199550010000001024000001032'
  }
];

const NFeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedNota, setSelectedNota] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredNotas = mockNotas.filter(nota => {
    const matchesSearch = 
      nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nota.destinatario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nota.destinatario.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (nota.chaveAcesso && nota.chaveAcesso.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = filterStatus === 'todos' || nota.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (nota: any) => {
    setSelectedNota(nota);
    setIsDetailsOpen(true);
  };

  const handleCreateNew = () => {
    navigate('/fiscal/nfe/nova');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'autorizada':
        return <Badge variant="default" className="bg-green-600">Autorizada</Badge>;
      case 'cancelada':
        return <Badge variant="destructive">Cancelada</Badge>;
      case 'rejeitada':
        return <Badge variant="destructive" className="bg-red-800">Rejeitada</Badge>;
      case 'rascunho':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'processando':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processando</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Notas Fiscais Eletrônicas"
          description="Gestão de documentos fiscais eletrônicos"
          icon={<Receipt className="h-6 w-6" />}
        />
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 md:flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="Buscar por número, destinatário, chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="autorizada">Autorizadas</SelectItem>
                    <SelectItem value="cancelada">Canceladas</SelectItem>
                    <SelectItem value="rascunho">Rascunhos</SelectItem>
                    <SelectItem value="rejeitada">Rejeitadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateNew} className="gap-1">
                <Plus size={16} />
                Nova NF-e
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Destinatário</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotas.length > 0 ? (
                    filteredNotas.map((nota) => (
                      <TableRow key={nota.id}>
                        <TableCell className="font-medium">
                          {nota.numero === '-' ? 'Rascunho' : `${nota.numero}/${nota.serie}`}
                        </TableCell>
                        <TableCell>
                          {nota.dataEmissao ? new Date(nota.dataEmissao).toLocaleDateString('pt-BR') : '-'}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{nota.destinatario.nome}</div>
                            <div className="text-xs text-muted-foreground">{nota.destinatario.numero}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {nota.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(nota.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleViewDetails(nota)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye size={16} />
                            </Button>
                            
                            {nota.status === 'autorizada' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                              >
                                <Download size={16} />
                              </Button>
                            )}
                            
                            {nota.status === 'rascunho' && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <FileCog size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        Nenhuma nota fiscal encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full md:max-w-lg">
          <SheetHeader>
            <SheetTitle>Detalhes da Nota Fiscal</SheetTitle>
            <SheetDescription>
              {selectedNota?.status === 'autorizada' ? 
                `NF-e ${selectedNota?.numero}/${selectedNota?.serie}` : 
                'Rascunho de NF-e'}
            </SheetDescription>
          </SheetHeader>
          
          {selectedNota && (
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Dados Gerais</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Número</p>
                    <p className="font-medium">{selectedNota.numero === '-' ? 'Rascunho' : `${selectedNota.numero}/${selectedNota.serie}`}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data de Emissão</p>
                    <p className="font-medium">
                      {selectedNota.dataEmissao ? new Date(selectedNota.dataEmissao).toLocaleDateString('pt-BR') : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p>{getStatusBadge(selectedNota.status)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Total</p>
                    <p className="font-medium">
                      {selectedNota.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Destinatário</h4>
                <div className="grid grid-cols-1 gap-1">
                  <div>
                    <p className="text-xs text-muted-foreground">Nome / Razão Social</p>
                    <p className="font-medium">{selectedNota.destinatario.nome}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CPF/CNPJ</p>
                    <p className="font-medium">{selectedNota.destinatario.numero}</p>
                  </div>
                </div>
              </div>
              
              {selectedNota.chaveAcesso && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Chave de Acesso</h4>
                  <p className="font-mono text-sm break-all">{selectedNota.chaveAcesso}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                {selectedNota.status === 'autorizada' && (
                  <Button className="gap-1 flex-1">
                    <Download size={16} />
                    Baixar DANFE
                  </Button>
                )}
                
                {selectedNota.status === 'rascunho' && (
                  <Button className="gap-1 flex-1">
                    <FileCog size={16} />
                    Editar
                  </Button>
                )}
                
                <Button variant="outline" className="gap-1" onClick={() => setIsDetailsOpen(false)}>
                  <FileSearch size={16} />
                  Consultar na SEFAZ
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
};

export default NFeList;
