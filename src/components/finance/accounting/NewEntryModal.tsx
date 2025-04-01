import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
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
import { cn } from '@/lib/utils';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from 'react';

// Custom DialogContent without the default close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = "CustomDialogContent";

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

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entries: any[]) => void;
}

const paymentMethods = [
  { id: 'cash', name: 'Dinheiro' },
  { id: 'pix', name: 'PIX' },
  { id: 'debit', name: 'Cartão de Débito' },
  { id: 'credit', name: 'Cartão de Crédito' },
  { id: 'boleto', name: 'Boleto' },
];

const installmentOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const boletoDueDates = [15, 30, 45, 60, 90];

const NewEntryModal = ({ isOpen, onClose, onSave }: NewEntryModalProps) => {
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
    }));

    try {
      onSave(ledgerEntries);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar lançamento:', error);
    }
  };

  // Reset the form
  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setDocument('');
    setDescription('');
    setEntryType('custom');
    setLines([
      { id: '1', account: '', description: '', isDebit: true, amount: 0 },
      { id: '2', account: '', description: '', isDebit: false, amount: 0 },
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Novo Lançamento Contábil
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Data do Lançamento</Label>
              <Input 
                id="date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="document">Número do Documento</Label>
              <Input 
                id="document" 
                placeholder="Ex: NF-12345" 
                value={document} 
                onChange={(e) => setDocument(e.target.value)} 
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
              {lines.map((line) => (
                <div key={line.id}>
                  {/* Linha principal com conta, tipo e valor */}
                  <div className="grid grid-cols-12 gap-2 items-center">
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
                    
                    <div className="col-span-3">
                      <Select 
                        value={line.isDebit ? 'debit' : 'credit'} 
                        onValueChange={(value) => updateLine(line.id, 'isDebit', value === 'debit')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debit">Débito</SelectItem>
                          <SelectItem value="credit">Crédito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-4">
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        placeholder="Valor" 
                        value={line.amount || ''}
                        onChange={(e) => updateLine(line.id, 'amount', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    
                    <div className="col-span-1 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeLine(line.id)}
                        disabled={lines.length <= 2}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Linha de forma de pagamento (estilo similar à imagem) */}
                  <div className="grid grid-cols-12 gap-2 items-center ml-6 mb-3 mt-1">
                    <div className="col-span-1 border-l-2 border-gray-600 h-6"></div>
                    <div className="col-span-3">
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
                    
                    {line.paymentMethod === 'credit' && (
                      <div className="col-span-3">
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
                      </div>
                    )}
                    
                    {line.paymentMethod === 'boleto' && (
                      <div className="col-span-3">
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
                      </div>
                    )}
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
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button 
              onClick={handleSave} 
              disabled={!isFormValid()}
            >
              Salvar Lançamento
            </Button>
          </div>
        </div>
      </CustomDialogContent>
    </Dialog>
  );
};

export default NewEntryModal;
