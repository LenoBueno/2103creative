import { useState } from 'react';
import { CalendarIcon, Filter, Download, Upload, Plus, InfoIcon } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NewEntryModal from './NewEntryModal';

// Mock data for the journal entries
const mockJournalData = [
  {
    id: '1',
    date: '2025-03-28',
    document: 'NF-12345',
    description: 'Venda de produtos',
    entries: [
      { account: '1.1 - Caixa', debit: 5000, credit: 0 },
      { account: '3.1 - Receita de Vendas', debit: 0, credit: 5000 },
    ],
    status: 'confirmed',
  },
  {
    id: '2',
    date: '2025-03-29',
    document: 'NF-789',
    description: 'Compra de material',
    entries: [
      { account: '1.2 - Estoque', debit: 2000, credit: 0 },
      { account: '2.1 - Fornecedores', debit: 0, credit: 2000 },
    ],
    status: 'confirmed',
  },
  {
    id: '3',
    date: '2025-03-30',
    document: 'FOL-03',
    description: 'Pagamento de salários',
    entries: [
      { account: '4.1 - Despesas com Pessoal', debit: 3000, credit: 0 },
      { account: '1.1 - Caixa', debit: 0, credit: 3000 },
    ],
    status: 'pending',
  },
];

interface AccountingJournalProps {
  showNewEntryButton?: boolean;
}

const AccountingJournal = ({ showNewEntryButton = true }: AccountingJournalProps) => {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [journalData, setJournalData] = useState(mockJournalData);
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-31');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Function to filter data based on filters
  const filteredData = journalData.filter((entry) => {
    // Date filtering
    const entryDate = new Date(entry.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (entryDate < start || entryDate > end) return false;
    
    // Status filtering
    if (statusFilter !== 'all' && entry.status !== statusFilter) return false;
    
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
              <CalendarIcon className="h-4 w-4 text-gray-500" />
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
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                  Confirmados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  Pendentes
                </DropdownMenuItem>
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

        <Alert className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            O Diário Contábil mostra os lançamentos agrupados por documento, diferente do Livro Razão que mostra por conta.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((journal) => (
              <Card key={journal.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{journal.description}</h3>
                        <Badge 
                          variant={journal.status === 'confirmed' ? 'default' : 'outline'} 
                          className={journal.status === 'confirmed' ? 'bg-green-500' : 'text-yellow-600 border-yellow-600'}
                        >
                          {journal.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 flex gap-4 mt-1">
                        <span>{new Date(journal.date).toLocaleDateString('pt-BR')}</span>
                        <span>Doc: {journal.document}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Excluir</Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Conta</TableHead>
                          <TableHead className="text-right">Débito</TableHead>
                          <TableHead className="text-right">Crédito</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {journal.entries.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{entry.account}</TableCell>
                            <TableCell className="text-right">
                              {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {/* Totals row */}
                        <TableRow className="bg-gray-50">
                          <TableCell className="font-medium">Total</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(
                              journal.entries.reduce((sum, entry) => sum + entry.debit, 0)
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(
                              journal.entries.reduce((sum, entry) => sum + entry.credit, 0)
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum registro encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Modal for new entry */}
      <NewEntryModal 
        isOpen={isNewEntryOpen} 
        onClose={() => setIsNewEntryOpen(false)}
        onSave={(entries) => {
          // In a real app, this would call an API
          // For this example, we'll just add to our journal data
          if (entries && entries.length > 0) {
            const newJournalEntry = {
              id: Date.now().toString(),
              date: entries[0].date,
              document: entries[0].document,
              description: entries[0].description,
              entries: entries.map(e => ({
                account: e.account,
                debit: e.debit,
                credit: e.credit
              })),
              status: 'pending'
            };
            
            setJournalData([newJournalEntry, ...journalData]);
          }
          setIsNewEntryOpen(false);
        }}
      />
    </Card>
  );
};

export default AccountingJournal;
