
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash } from 'lucide-react';
import { Item } from '@/types/nfe';

interface ItensFormProps {
  itens: Item[];
  onAddItem: (item: Omit<Item, 'id'>) => void;
  onUpdateItem: (item: Item) => void;
  onRemoveItem: (id: string) => void;
}

const ItensForm = ({ itens, onAddItem, onUpdateItem, onRemoveItem }: ItensFormProps) => {
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [novoItem, setNovoItem] = useState<Omit<Item, 'id'>>({
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
        valor: 0
      },
      pis: {
        cst: '01',
        aliquota: 1.65,
        baseCalculo: 0,
        valor: 0
      },
      cofins: {
        cst: '01',
        aliquota: 7.6,
        baseCalculo: 0,
        valor: 0
      }
    }
  });

  const totalItens = useMemo(() => {
    return itens.reduce((acc, item) => acc + item.valorTotal, 0);
  }, [itens]);

  const handleInputChange = (field: string, value: any) => {
    const updatedItem = { ...novoItem };
    
    if (field === 'quantidade' || field === 'valorUnitario') {
      const quantidade = field === 'quantidade' ? parseFloat(value) || 0 : novoItem.quantidade;
      const valorUnitario = field === 'valorUnitario' ? parseFloat(value) || 0 : novoItem.valorUnitario;
      
      updatedItem.quantidade = quantidade;
      updatedItem.valorUnitario = valorUnitario;
      updatedItem.valorTotal = quantidade * valorUnitario;
      
      // Atualizar base de cálculo e valores dos tributos
      updatedItem.tributos.icms.baseCalculo = updatedItem.valorTotal;
      updatedItem.tributos.icms.valor = updatedItem.valorTotal * (updatedItem.tributos.icms.aliquota / 100);
      
      updatedItem.tributos.pis.baseCalculo = updatedItem.valorTotal;
      updatedItem.tributos.pis.valor = updatedItem.valorTotal * (updatedItem.tributos.pis.aliquota / 100);
      
      updatedItem.tributos.cofins.baseCalculo = updatedItem.valorTotal;
      updatedItem.tributos.cofins.valor = updatedItem.valorTotal * (updatedItem.tributos.cofins.aliquota / 100);
    } else if (field.startsWith('tributos.')) {
      // Para campos aninhados (ex: tributos.icms.cst)
      const parts = field.split('.');
      if (parts.length === 3) {
        const [parent, child, prop] = parts;
        
        if (child && prop) {
          updatedItem[parent][child][prop] = value;
          
          // Recalcular o valor do tributo se a alíquota foi alterada
          if (prop === 'aliquota') {
            updatedItem[parent][child].valor = updatedItem[parent][child].baseCalculo * (value / 100);
          }
        }
      }
    } else {
      // Para campos simples
      updatedItem[field] = value;
    }
    
    setNovoItem(updatedItem);
  };

  const handleAddOrUpdateItem = () => {
    if (editingItem) {
      onUpdateItem({
        ...editingItem,
        ...novoItem
      });
      setEditingItem(null);
    } else {
      onAddItem(novoItem);
    }
    
    // Resetar formulário
    setNovoItem({
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
          valor: 0
        },
        pis: {
          cst: '01',
          aliquota: 1.65,
          baseCalculo: 0,
          valor: 0
        },
        cofins: {
          cst: '01',
          aliquota: 7.6,
          baseCalculo: 0,
          valor: 0
        }
      }
    });
  };

  const startEditing = (item: Item) => {
    setEditingItem(item);
    
    // Use the item data to populate the form
    const itemForEditing: Omit<Item, 'id'> = {
      codigo: item.codigo,
      descricao: item.descricao,
      ncm: item.ncm,
      cfop: item.cfop,
      unidade: item.unidade,
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
      valorTotal: item.valorTotal,
      tributos: item.tributos
    };
    
    setNovoItem(itemForEditing);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Adicionar Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                value={novoItem.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={novoItem.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ncm">NCM</Label>
              <Input
                id="ncm"
                value={novoItem.ncm}
                onChange={(e) => handleInputChange('ncm', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cfop">CFOP</Label>
              <Select
                value={novoItem.cfop}
                onValueChange={(value) => handleInputChange('cfop', value)}
              >
                <SelectTrigger id="cfop">
                  <SelectValue placeholder="CFOP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5102">5102 - Venda de Merc. Adq. de Terceiros</SelectItem>
                  <SelectItem value="5101">5101 - Venda de Merc. Fabricada pelo Estabelecimento</SelectItem>
                  <SelectItem value="5910">5910 - Remessa em bonificação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select
                value={novoItem.unidade}
                onValueChange={(value) => handleInputChange('unidade', value)}
              >
                <SelectTrigger id="unidade">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UN">UN - Unidade</SelectItem>
                  <SelectItem value="KG">KG - Quilograma</SelectItem>
                  <SelectItem value="LT">LT - Litro</SelectItem>
                  <SelectItem value="MT">MT - Metro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                min="0"
                step="1"
                value={novoItem.quantidade}
                onChange={(e) => handleInputChange('quantidade', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="valorUnitario">Valor Unitário</Label>
              <Input
                id="valorUnitario"
                type="number"
                min="0"
                step="0.01"
                value={novoItem.valorUnitario}
                onChange={(e) => handleInputChange('valorUnitario', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="valorTotal">Valor Total</Label>
              <Input
                id="valorTotal"
                type="number"
                value={novoItem.valorTotal}
                disabled
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Tributação</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icms_cst">CST ICMS</Label>
                <Select
                  value={novoItem.tributos.icms.cst}
                  onValueChange={(value) => handleInputChange('tributos.icms.cst', value)}
                >
                  <SelectTrigger id="icms_cst">
                    <SelectValue placeholder="CST" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00">00 - Tributada integralmente</SelectItem>
                    <SelectItem value="10">10 - Tributada com cobrança de ICMS por ST</SelectItem>
                    <SelectItem value="20">20 - Com redução de base de cálculo</SelectItem>
                    <SelectItem value="40">40 - Isenta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="icms_aliquota">Alíquota ICMS (%)</Label>
                <Input
                  id="icms_aliquota"
                  type="number"
                  min="0"
                  step="0.01"
                  value={novoItem.tributos.icms.aliquota}
                  onChange={(e) => handleInputChange('tributos.icms.aliquota', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="icms_valor">Valor ICMS</Label>
                <Input
                  id="icms_valor"
                  type="number"
                  value={novoItem.tributos.icms.valor}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="button" onClick={handleAddOrUpdateItem} className="gap-2">
              {editingItem ? <Edit size={16} /> : <Plus size={16} />}
              {editingItem ? 'Atualizar Item' : 'Adicionar Item'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Itens da Nota</h3>
          
          {itens.length === 0 && (
            <p className="text-center py-4 text-gray-500">Nenhum item adicionado à nota</p>
          )}
          
          {itens.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Código</th>
                    <th className="px-4 py-2 text-left">Descrição</th>
                    <th className="px-4 py-2 text-right">Quantidade</th>
                    <th className="px-4 py-2 text-right">Valor Unit.</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{item.codigo}</td>
                      <td className="px-4 py-2">{item.descricao}</td>
                      <td className="px-4 py-2 text-right">{item.quantidade}</td>
                      <td className="px-4 py-2 text-right">
                        {item.valorUnitario.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {item.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(item)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-medium">
                    <td colSpan={4} className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2 text-right">
                      {totalItens.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ItensForm;
