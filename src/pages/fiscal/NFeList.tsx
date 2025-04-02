
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Plus } from 'lucide-react';

// Dados de exemplo
const mockNFes = [
  {
    id: '1',
    numero: '000001',
    serie: '1',
    dataEmissao: '2023-06-15',
    destinatario: {
      nome: 'Cliente A',
      numero: '12345678000199'
    },
    valor: 1250.75,
    status: 'autorizada',
    chaveAcesso: '43210612345678000199550010000000011000000011'
  },
  {
    id: '2',
    numero: '000002',
    serie: '1',
    dataEmissao: '2023-06-16',
    destinatario: {
      nome: 'Cliente B',
      numero: '98765432000188'
    },
    valor: 875.50,
    status: 'autorizada',
    chaveAcesso: '43210612345678000199550010000000021000000022'
  },
  {
    id: '3',
    numero: '000003',
    serie: '1',
    dataEmissao: '2023-06-17',
    destinatario: {
      nome: 'Cliente C',
      numero: '11122233344455'
    },
    valor: 350.00,
    status: 'rejeitada',
    chaveAcesso: null
  },
  {
    id: '4',
    numero: null,
    serie: '1',
    dataEmissao: '2023-06-20',
    destinatario: {
      nome: 'Cliente D',
      numero: '22233344455566'
    },
    valor: 780.25,
    status: 'rascunho',
    chaveAcesso: null
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'autorizada':
      return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Autorizada</Badge>;
    case 'rejeitada':
      return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">Rejeitada</Badge>;
    case 'cancelada':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Cancelada</Badge>;
    case 'rascunho':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">Rascunho</Badge>;
    case 'processando':
      return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Processando</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const NFeList = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Notas Fiscais Eletrônicas"
          description="Consulte e gerencie todas as suas NF-e/NFC-e"
          icon={<FileText className="h-6 w-6" />}
          actions={
            <Link to="/fiscal/nfe/novo">
              <Button className="gap-2">
                <Plus size={16} />
                Nova NF-e
              </Button>
            </Link>
          }
        />
        
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Data de Emissão</TableHead>
                    <TableHead>Destinatário</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNFes.map((nfe) => (
                    <TableRow key={nfe.id}>
                      <TableCell className="font-medium">
                        {nfe.numero || <span className="text-gray-500">-</span>}
                      </TableCell>
                      <TableCell>
                        {new Date(nfe.dataEmissao).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {nfe.destinatario.nome}
                        <div className="text-xs text-gray-500">
                          {nfe.destinatario.numero}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {nfe.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(nfe.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button variant="ghost" size="icon" disabled={!nfe.chaveAcesso}>
                            <Download size={16} />
                          </Button>
                          <Link to={`/fiscal/nfe/${nfe.id}`}>
                            <Button variant="outline" size="sm">Visualizar</Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NFeList;
