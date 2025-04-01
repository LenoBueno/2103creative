import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MainLayout from '@/components/layout/MainLayout';
import { PageTransition } from '@/components/ui/page-transition';

// Lista de contas contábeis (simplificada para o exemplo)
const accountsList = [
  { id: '1.1', name: '1.1 - Caixa' },
  { id: '1.2', name: '1.2 - Estoque' },
  { id: '2.1', name: '2.1 - Fornecedores' },
  { id: '3.1', name: '3.1 - Receita de Vendas' },
  { id: '4.1', name: '4.1 - Despesas com Pessoal' },
  { id: '5.1', name: '5.1 - Impostos a Pagar' },
  { id: '6.1', name: '6.1 - Imobilizado' },
];

// Tipos de lançamento predefinidos
const entryTypes = [
  { id: 'sales', name: 'Venda', debitAccount: '1.1', creditAccount: '3.1' },
  { id: 'purchase', name: 'Compra', debitAccount: '1.2', creditAccount: '2.1' },
  { id: 'expense', name: 'Despesa', debitAccount: '4.1', creditAccount: '1.1' },
  { id: 'tax', name: 'Imposto', debitAccount: '5.1', creditAccount: '1.1' },
  { id: 'custom', name: 'Lançamento Personalizado', debitAccount: '', creditAccount: '' },
];

// Tipos de pagamento
const paymentMethods = [
  { id: 'pix', name: 'PIX' },
  { id: 'cash', name: 'Dinheiro' },
  { id: 'boleto', name: 'Boleto' },
  { id: 'debit', name: 'Cartão de Débito' },
  { id: 'credit', name: 'Cartão de Crédito' },
];

const installmentOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const boletoDueDates = [15, 30, 45, 60, 90];

interface EntryLine {
  id: string;
  account: string;
  description: string;
  isDebit: boolean;
  amount: number;
  paymentMethod?: string;
  installments?: number;
  dueDate?: string;
}

const NewEntryPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [document, setDocument] = useState('');
  const [description, setDescription] = useState('');
  const [entryType, setEntryType] = useState('custom');
  const [lines, setLines] = useState<EntryLine[]>([
    { id: '1', account: '', description: '', isDebit: true, amount: 0 },
    { id: '2', account: '', description: '', isDebit: false, amount: 0 },
  ]);

  // Handle type selection
  const handleTypeChange = (type: string) => {
    setEntryType(type);
    
    // If it's a predefined type, set up the accounts
    if (type !== 'custom') {
      const selectedType = entryTypes.find(t => t.id === type);
      if (selectedType) {
        setLines([
          { 
            id: '1', 
            account: selectedType.debitAccount, 
            description: description || selectedType.name, 
            isDebit: true, 
            amount: 0 
          },
          { 
            id: '2', 
            account: selectedType.creditAccount, 
            description: description || selectedType.name, 
            isDebit: false, 
            amount: 0 
          },
        ]);
      }
    }
  };

  // Add a new line
  const addLine = () => {
    const newId = (lines.length + 1).toString();
    setLines([...lines, { id: newId, account: '', description: '', isDebit: true, amount: 0 }]);
  };

  // Remove a line
  const removeLine = (id: string) => {
    if (lines.length <= 2) return; // Minimum of 2 lines
    setLines(lines.filter(line => line.id !== id));
  };

  // Update a line
  const updateLine = (id: string, field: keyof EntryLine, value: any) => {
    setLines(
      lines.map(line => 
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  // Calculate totals
  const totalDebit = lines.reduce((sum, line) => sum + (line.isDebit ? line.amount : 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (!line.isDebit ? line.amount : 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  // Check if the form is valid
  const isFormValid = () => {
    return (
      date &&
      document && 
      description &&
      isBalanced &&
      lines.every(line => line.account && line.amount > 0)
    );
  };

  // Handle save
  const handleSave = () => {
    if (!isFormValid()) return;

    // Create entries for the ledger
    const ledgerEntries = lines.map((line, index) => ({
      id: Date.now().toString() + index,
      date,
      document,
      description: line.description || description,
      account: accountsList.find(a => a.id === line.account)?.name || line.account,
      debit: line.isDebit ? line.amount : 0,
      credit: !line.isDebit ? line.amount : 0,
      balance: line.isDebit ? line.amount : -line.amount,
      paymentMethod: line.paymentMethod,
      installments: line.installments,
      dueDate: line.dueDate
    }));

    try {
      // Em um sistema real, aqui chamaríamos uma API para salvar os dados
      console.log('Entradas salvas:', ledgerEntries);
      
      // Redirecionar para a página de contabilidade
      navigate('/finance/accounting');
    } catch (error) {
      console.error('Erro ao salvar lançamento:', error);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/finance/accounting')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Novo Lançamento Contábil</h1>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-foreground">Data do Lançamento</Label>
                    <div className="relative">
                      <Input 
                        id="date" 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="text-foreground dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:focus:border-slate-500 focus:border-slate-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="document" className="text-foreground">Número do Documento</Label>
                    <Input 
                      id="document" 
                      placeholder="Ex: NF-12345" 
                      value={document} 
                      onChange={(e) => setDocument(e.target.value)} 
                      className="text-foreground dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descrição do lançamento" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                  />
                </div>
                
                {/* Tipo de Lançamento */}
                <div className="space-y-2">
                  <Label>Tipo de Lançamento</Label>
                  <RadioGroup value={entryType} onValueChange={handleTypeChange} className="flex flex-wrap gap-2">
                    {entryTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.id} id={`type-${type.id}`} />
                        <Label htmlFor={`type-${type.id}`} className="cursor-pointer">
                          {type.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* Linhas de Lançamento */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-medium">Contas e Valores</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addLine}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Linha
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Linha de débito */}
                    {lines.filter(line => line.isDebit).map((line) => (
                      <div key={line.id} className="space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-center">
                          {/* Conta */}
                          <div className="col-span-4">
                            <Select 
                              value={line.account} 
                              onValueChange={(value) => updateLine(line.id, 'account', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a conta" />
                              </SelectTrigger>
                              <SelectContent>
                                {accountsList.map((account) => (
                                  <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Forma de Pagamento */}
                          <div className="col-span-2">
                            <Select 
                              value={line.paymentMethod || ''}
                              onValueChange={(value) => updateLine(line.id, 'paymentMethod', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Forma de pagamento" />
                              </SelectTrigger>
                              <SelectContent>
                                {paymentMethods.map((method) => (
                                  <SelectItem key={method.id} value={method.id}>
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Condições de Pagamento (condicional) */}
                          <div className="col-span-2">
                            {line.paymentMethod === 'credit' && (
                              <Select 
                                value={line.installments?.toString() || '1'}
                                onValueChange={(value) => updateLine(line.id, 'installments', parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Parcelas" />
                                </SelectTrigger>
                                <SelectContent>
                                  {installmentOptions.map((option) => (
                                    <SelectItem key={option} value={option.toString()}>
                                      {option === 1 ? 'À vista' : `${option}x`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            
                            {line.paymentMethod === 'boleto' && (
                              <Select 
                                value={line.dueDate || '30'}
                                onValueChange={(value) => updateLine(line.id, 'dueDate', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Prazo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {boletoDueDates.map((days) => (
                                    <SelectItem key={days} value={days.toString()}>
                                      {days} dias
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            
                            {(line.paymentMethod === 'cash' || line.paymentMethod === 'pix' || line.paymentMethod === 'debit') && (
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm text-gray-500">
                                À vista
                              </div>
                            )}
                            
                            {!line.paymentMethod && (
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm text-gray-400">
                                Condições
                              </div>
                            )}
                          </div>
                          
                          {/* Valor */}
                          <div className="col-span-3">
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01"
                              placeholder="Valor" 
                              value={line.amount || ''}
                              onChange={(e) => updateLine(line.id, 'amount', parseFloat(e.target.value) || 0)} 
                            />
                          </div>
                          
                          {/* Remover - ajustado para melhor alinhamento */}
                          <div className="col-span-1 flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-9 w-9 p-0 rounded-full hover:bg-gray-100"
                              onClick={() => removeLine(line.id)}
                              disabled={lines.length <= 2}
                            >
                              <Trash2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Linha de crédito */}
                    {lines.filter(line => !line.isDebit).map((line) => (
                      <div key={line.id} className="space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-center">
                          {/* Conta */}
                          <div className="col-span-4">
                            <Select 
                              value={line.account} 
                              onValueChange={(value) => updateLine(line.id, 'account', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a conta" />
                              </SelectTrigger>
                              <SelectContent>
                                {accountsList.map((account) => (
                                  <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Forma de Pagamento */}
                          <div className="col-span-2">
                            <Select 
                              value={line.paymentMethod || ''}
                              onValueChange={(value) => updateLine(line.id, 'paymentMethod', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Forma de pagamento" />
                              </SelectTrigger>
                              <SelectContent>
                                {paymentMethods.map((method) => (
                                  <SelectItem key={method.id} value={method.id}>
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Condições de Pagamento (condicional) */}
                          <div className="col-span-2">
                            {line.paymentMethod === 'credit' && (
                              <Select 
                                value={line.installments?.toString() || '1'}
                                onValueChange={(value) => updateLine(line.id, 'installments', parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Parcelas" />
                                </SelectTrigger>
                                <SelectContent>
                                  {installmentOptions.map((option) => (
                                    <SelectItem key={option} value={option.toString()}>
                                      {option === 1 ? 'À vista' : `${option}x`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            
                            {line.paymentMethod === 'boleto' && (
                              <Select 
                                value={line.dueDate || '30'}
                                onValueChange={(value) => updateLine(line.id, 'dueDate', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Prazo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {boletoDueDates.map((days) => (
                                    <SelectItem key={days} value={days.toString()}>
                                      {days} dias
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            
                            {(line.paymentMethod === 'cash' || line.paymentMethod === 'pix' || line.paymentMethod === 'debit') && (
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm text-gray-500">
                                À vista
                              </div>
                            )}
                            
                            {!line.paymentMethod && (
                              <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm text-gray-400">
                                Condições
                              </div>
                            )}
                          </div>
                          
                          {/* Valor */}
                          <div className="col-span-3">
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01"
                              placeholder="Valor" 
                              value={line.amount || ''}
                              onChange={(e) => updateLine(line.id, 'amount', parseFloat(e.target.value) || 0)} 
                            />
                          </div>
                          
                          {/* Remover - ajustado para melhor alinhamento */}
                          <div className="col-span-1 flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-9 w-9 p-0 rounded-full hover:bg-gray-100"
                              onClick={() => removeLine(line.id)}
                              disabled={lines.length <= 2}
                            >
                              <Trash2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Totais */}
                  <div className="flex justify-end space-x-4 border-t pt-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Débito</p>
                      <p className="text-lg font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDebit)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Crédito</p>
                      <p className="text-lg font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCredit)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Erro se não estiver balanceado */}
                  {(totalDebit > 0 || totalCredit > 0) && !isBalanced && (
                    <div className="text-red-500 text-sm">
                      O lançamento não está balanceado. Total de débitos deve ser igual ao total de créditos.
                    </div>
                  )}
                </div>
                
                {/* Botões de Ação */}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => navigate('/finance/accounting')}>Cancelar</Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={!isFormValid()}
                  >
                    Salvar Lançamento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default NewEntryPage;
