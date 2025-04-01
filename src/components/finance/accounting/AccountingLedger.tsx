import { useState } from 'react';
import { Calendar, Download, Filter, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NewEntryModal from './NewEntryModal';

// Mock data for the ledger
const mockLedgerData = [
  {
    id: '1',
    date: '2025-03-28',
    document: 'NF-12345',
    description: 'Venda de produtos',
    account: '1.1 - Caixa',
    debit: 5000,
    credit: 0,
    balance: 5000,
  },
  {
    id: '2',
    date: '2025-03-28',
    document: 'NF-12345',
    description: 'Venda de produtos',
    account: '3.1 - Receita de Vendas',
    debit: 0,
    credit: 5000,
    balance: -5000,
  },
  {
    id: '3',
    date: '2025-03-29',
    document: 'NF-789',
    description: 'Compra de material',
    account: '2.1 - Fornecedores',
    debit: 0,
    credit: 2000,
    balance: -2000,
  },
  {
    id: '4',
    date: '2025-03-29',
    document: 'NF-789',
    description: 'Compra de material',
    account: '1.2 - Estoque',
    debit: 2000,
    credit: 0,
    balance: 2000,
  },
  {
    id: '5',
    date: '2025-03-30',
    document: 'FOL-03',
    description: 'Pagamento de salários',
    account: '1.1 - Caixa',
    debit: 0,
    credit: 3000,
    balance: 2000,
  },
  {
    id: '6',
    date: '2025-03-30',
    document: 'FOL-03',
    description: 'Pagamento de salários',
    account: '4.1 - Despesas com Pessoal',
    debit: 3000,
    credit: 0,
    balance: 3000,
  },
];

interface AccountingLedgerProps {
  showNewEntryButton?: boolean;
}

const AccountingLedger = ({ showNewEntryButton = true }: AccountingLedgerProps) => {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [ledgerData, setLedgerData] = useState(mockLedgerData);
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-31');
  const [filterAccount, setFilterAccount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter data based on filters
  const filteredData = ledgerData.filter((entry) => {
    // Date filtering
    const entryDate = new Date(entry.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (entryDate < start || entryDate > end) return false;
    
    // Account filtering
    if (filterAccount && !entry.account.includes(filterAccount)) return false;
    
    // Search term
    if (
      searchTerm && 
      !entry.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !entry.document.toLowerCase().includes(searchTerm.toLowerCase())
    ) return false;
    
    return true;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-1.5"
              />
              <span>até</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-1.5"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2">
                <div className="space-y-2 p-2">
                  <p className="text-sm font-medium">Filtrar por Conta</p>
                  <Select value={filterAccount} onValueChange={setFilterAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as contas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as contas</SelectItem>
                      <SelectItem value="1.1">1.1 - Caixa</SelectItem>
                      <SelectItem value="1.2">1.2 - Estoque</SelectItem>
                      <SelectItem value="2.1">2.1 - Fornecedores</SelectItem>
                      <SelectItem value="3.1">3.1 - Receita de Vendas</SelectItem>
                      <SelectItem value="4.1">4.1 - Despesas com Pessoal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              placeholder="Buscar por descrição ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Upload className="h-4 w-4" />
              Importar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            {showNewEntryButton && (
              <Button 
                onClick={() => setIsNewEntryOpen(true)}
                className="flex items-center gap-1"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Novo Lançamento
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead className="text-right">Débito</TableHead>
                <TableHead className="text-right">Crédito</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{entry.document}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.account}</TableCell>
                    <TableCell className="text-right">
                      {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                    </TableCell>
                    <TableCell className={`text-right ${entry.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {formatCurrency(Math.abs(entry.balance))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    Nenhum registro encontrado para os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {/* Modal for new entry */}
      <NewEntryModal 
        isOpen={isNewEntryOpen} 
        onClose={() => setIsNewEntryOpen(false)}
        onSave={(entries) => {
          // In a real app, this would call an API
          // For this example, we'll just add to our state
          if (entries && entries.length > 0) {
            setLedgerData([...ledgerData, ...entries]);
          }
          setIsNewEntryOpen(false);
        }}
      />
    </Card>
  );
};

export default AccountingLedger;
