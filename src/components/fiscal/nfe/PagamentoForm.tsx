
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Calendar } from "lucide-react";

interface Parcela {
  numero: number;
  vencimento: string;
  valor: number;
}

interface PagamentoFormProps {
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  updateParcelas: (parcelas: Parcela[]) => void;
  totalNota: number;
}

const PagamentoForm = ({ 
  values, 
  handleChange, 
  handleSelectChange, 
  updateParcelas, 
  totalNota 
}: PagamentoFormProps) => {
  const [parcelas, setParcelas] = useState<Parcela[]>(values.pagamento?.parcelas || []);
  const [numParcelas, setNumParcelas] = useState(1);

  const formasPagamento = [
    { value: '01', label: '01 - Dinheiro' },
    { value: '02', label: '02 - Cheque' },
    { value: '03', label: '03 - Cartão de Crédito' },
    { value: '04', label: '04 - Cartão de Débito' },
    { value: '05', label: '05 - Crédito Loja' },
    { value: '10', label: '10 - Vale Alimentação' },
    { value: '15', label: '15 - Boleto Bancário' },
    { value: '90', label: '90 - Sem Pagamento' },
    { value: '99', label: '99 - Outros' }
  ];

  const gerarParcelas = () => {
    const hoje = new Date();
    const novasParcelas: Parcela[] = [];
    const valorParcela = totalNota / numParcelas;
    
    for (let i = 0; i < numParcelas; i++) {
      const dataVencimento = new Date(hoje);
      dataVencimento.setDate(hoje.getDate() + (i * 30)); // 30 dias entre parcelas
      
      novasParcelas.push({
        numero: i + 1,
        vencimento: dataVencimento.toISOString().split('T')[0],
        valor: i === numParcelas - 1 
          ? Math.round((totalNota - (valorParcela * i)) * 100) / 100 // ajuste na última parcela
          : Math.round(valorParcela * 100) / 100
      });
    }
    
    setParcelas(novasParcelas);
    updateParcelas(novasParcelas);
  };

  const handleRemoverParcela = (index: number) => {
    const novasParcelas = [...parcelas];
    novasParcelas.splice(index, 1);
    
    // Reajustar números das parcelas
    novasParcelas.forEach((parcela, idx) => {
      parcela.numero = idx + 1;
    });
    
    setParcelas(novasParcelas);
    updateParcelas(novasParcelas);
  };

  const handleParcelaChange = (index: number, field: keyof Parcela, value: any) => {
    const novasParcelas = [...parcelas];
    novasParcelas[index] = {
      ...novasParcelas[index],
      [field]: field === 'valor' ? parseFloat(value) : value
    };
    
    setParcelas(novasParcelas);
    updateParcelas(novasParcelas);
  };

  const isPrazo = values.pagamento?.forma === '15';

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-4">Forma de Pagamento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="pagamento.forma">Forma de Pagamento</Label>
            <Select 
              value={values.pagamento?.forma || '01'} 
              onValueChange={(value) => handleSelectChange("pagamento.forma", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {formasPagamento.map(forma => (
                  <SelectItem key={forma.value} value={forma.value}>
                    {forma.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="pagamento.valor">Valor Total</Label>
            <Input
              id="pagamento.valor"
              name="pagamento.valor"
              type="number"
              step="0.01"
              value={totalNota}
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>
        
        {isPrazo && (
          <div className="mt-6">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-24">
                <Label htmlFor="numParcelas">Nº Parcelas</Label>
                <Input
                  id="numParcelas"
                  type="number"
                  min="1"
                  value={numParcelas}
                  onChange={(e) => setNumParcelas(parseInt(e.target.value))}
                />
              </div>
              <Button onClick={gerarParcelas} type="button" className="gap-1">
                <Plus size={16} />
                Gerar Parcelas
              </Button>
            </div>
            
            {parcelas.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parcelas.map((parcela, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {parcela.numero}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Input
                              type="date"
                              value={parcela.vencimento}
                              onChange={(e) => handleParcelaChange(index, 'vencimento', e.target.value)}
                              className="w-full"
                            />
                            <Calendar size={16} className="text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={parcela.valor}
                            onChange={(e) => handleParcelaChange(index, 'valor', e.target.value)}
                            className="text-right"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleRemoverParcela(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} className="text-right font-medium">
                        Total:
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {parcelas.reduce((acc, parcela) => acc + parcela.valor, 0).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Clique em "Gerar Parcelas" para criar o parcelamento
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PagamentoForm;
