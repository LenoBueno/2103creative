
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import NCMInput from '@/components/inventory/fiscal/NCMInput';

interface Item {
  id: string;
  codigo: string;
  descricao: string;
  ncm: string;
  cfop: string;
  unidade: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  tributos: {
    icms: {
      cst: string;
      aliquota: number;
      baseCalculo: number;
      valor: number;
    };
    pis: { 
      cst: string; 
      aliquota: number;
      baseCalculo: number;
      valor: number;
    };
    cofins: { 
      cst: string; 
      aliquota: number;
      baseCalculo: number;
      valor: number;
    };
  };
}

interface ItensFormProps {
  itens: Item[];
  onAddItem: (item: Item) => void;
  onUpdateItem: (item: Item) => void;
  onRemoveItem: (id: string) => void;
}

const ItensForm = ({ itens, onAddItem, onUpdateItem, onRemoveItem }: ItensFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formItem, setFormItem] = useState<Partial<Item>>({
    codigo: '',
    descricao: '',
    ncm: '',
    cfop: '5102',
    unidade: 'UN',
    quantidade: 1,
    valorUnitario: 0,
    valorTotal: 0,
    tributos: {
      icms: {
        cst: '00',
        aliquota: 18,
        baseCalculo: 0,
        valor: 0,
      },
      pis: {
        cst: '01',
        aliquota: 1.65,
        baseCalculo: 0,
        valor: 0,
      },
      cofins: {
        cst: '01',
        aliquota: 7.6,
        baseCalculo: 0,
        valor: 0,
      }
    }
  });

  const handleOpenDialog = (item?: Item) => {
    if (item) {
      setEditingItem(item);
      setFormItem({ ...item });
    } else {
      setEditingItem(null);
      setFormItem({
        codigo: '',
        descricao: '',
        ncm: '',
        cfop: '5102',
        unidade: 'UN',
        quantidade: 1,
        valorUnitario: 0,
        valorTotal: 0,
        tributos: {
          icms: {
            cst: '00',
            aliquota: 18,
            baseCalculo: 0,
            valor: 0,
          },
          pis: {
            cst: '01',
            aliquota: 1.65,
            baseCalculo: 0,
            valor: 0,
          },
          cofins: {
            cst: '01',
            aliquota: 7.6,
            baseCalculo: 0,
            valor: 0,
          }
        }
      });
    }
    setIsDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, subchild] = name.split('.');
      setFormItem(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: subchild 
            ? { 
                ...(prev[parent as keyof typeof prev] as any)[child],
                [subchild]: value 
              }
            : value
        }
      }));
    } else {
      setFormItem({ ...formItem, [name]: value });
    }

    // Recalcular o valor total quando quantidade ou valor unitário mudar
    if (name === 'quantidade' || name === 'valorUnitario') {
      const quantidade = name === 'quantidade' ? parseFloat(value) : formItem.quantidade;
      const valorUnitario = name === 'valorUnitario' ? parseFloat(value) : formItem.valorUnitario;
      
      if (!isNaN(quantidade) && !isNaN(valorUnitario)) {
        const valorTotal = quantidade * valorUnitario;
        setFormItem(prev => ({
          ...prev,
          valorTotal,
          tributos: {
            ...prev.tributos!,
            icms: {
              ...prev.tributos!.icms,
              baseCalculo: valorTotal,
              valor: valorTotal * (prev.tributos!.icms.aliquota / 100)
            },
            pis: {
              ...prev.tributos!.pis,
              baseCalculo: valorTotal,
              valor: valorTotal * (prev.tributos!.pis.aliquota / 100)
            },
            cofins: {
              ...prev.tributos!.cofins,
              baseCalculo: valorTotal,
              valor: valorTotal * (prev.tributos!.cofins.aliquota / 100)
            }
          }
        }));
      }
    }
  };

  const handleNCMChange = (value: string) => {
    setFormItem({ ...formItem, ncm: value });
  };

  const handleSaveItem = () => {
    if (!formItem.descricao || !formItem.ncm) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const finalItem = {
      ...formItem,
      id: editingItem ? editingItem.id : `item_${Date.now()}`
    } as Item;

    if (editingItem) {
      onUpdateItem(finalItem);
    } else {
      onAddItem(finalItem);
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Itens da Nota</h3>
            <Button onClick={() => handleOpenDialog()} className="gap-1">
              <Plus size={16} />
              Adicionar Item
            </Button>
          </div>

          {itens.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>NCM</TableHead>
                    <TableHead className="text-right">Qtd</TableHead>
                    <TableHead className="text-right">Valor Un.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.codigo}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>{item.ncm}</TableCell>
                      <TableCell className="text-right">
                        {item.quantidade} {item.unidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.valorUnitario.toLocaleString('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.valorTotal.toLocaleString('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        })}
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum item adicionado</p>
              <p className="text-sm mt-1">Clique no botão acima para adicionar itens à nota fiscal</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar Item" : "Adicionar Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="codigo">Código do Produto</Label>
              <Input
                id="codigo"
                name="codigo"
                value={formItem.codigo}
                onChange={handleChange}
                placeholder="Código do produto"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                name="descricao"
                value={formItem.descricao}
                onChange={handleChange}
                placeholder="Descrição do produto"
              />
            </div>
            <div>
              <NCMInput
                value={formItem.ncm || ''}
                onChange={handleNCMChange}
              />
            </div>
            <div>
              <Label htmlFor="cfop">CFOP</Label>
              <Input
                id="cfop"
                name="cfop"
                value={formItem.cfop}
                onChange={handleChange}
                placeholder="Ex: 5102"
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Input
                id="unidade"
                name="unidade"
                value={formItem.unidade}
                onChange={handleChange}
                placeholder="UN, KG, etc."
              />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                value={formItem.quantidade}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="valorUnitario">Valor Unitário</Label>
              <Input
                id="valorUnitario"
                name="valorUnitario"
                type="number"
                step="0.01"
                value={formItem.valorUnitario}
                onChange={handleChange}
                placeholder="0,00"
              />
            </div>
            <div>
              <Label>Valor Total</Label>
              <Input
                readOnly
                value={formItem.valorTotal?.toLocaleString('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL',
                  minimumFractionDigits: 2
                })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="tributos.icms.cst">CST ICMS</Label>
              <Input
                id="tributos.icms.cst"
                name="tributos.icms.cst"
                value={formItem.tributos?.icms.cst}
                onChange={handleChange}
                placeholder="00"
              />
            </div>
            <div>
              <Label htmlFor="tributos.icms.aliquota">Alíquota ICMS (%)</Label>
              <Input
                id="tributos.icms.aliquota"
                name="tributos.icms.aliquota"
                type="number"
                step="0.01"
                value={formItem.tributos?.icms.aliquota}
                onChange={handleChange}
                placeholder="18.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setIsDialogOpen(false)}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveItem}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItensForm;
