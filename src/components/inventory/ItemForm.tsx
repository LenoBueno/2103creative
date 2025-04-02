
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info, Receipt, Package, Save, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ItemFormProps {
  onClose: () => void;
  onSave: (item: any) => void;
  editingItem?: any;
}

const ItemForm = ({ onClose, onSave, editingItem }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    codigo: editingItem?.codigo || '',
    descricao: editingItem?.descricao || '',
    unidade: editingItem?.unidade || 'UN',
    grupo: editingItem?.grupo || '',
    preco: editingItem?.preco || '',
    estoque: {
      estoque_minimo: editingItem?.estoque?.estoque_minimo || '',
      estoque_maximo: editingItem?.estoque?.estoque_maximo || '',
    },
    fiscal: {
      ncm: editingItem?.fiscal?.ncm || '',
      cest: editingItem?.fiscal?.cest || '',
      origem: editingItem?.fiscal?.origem || '0',
      icms_cst: editingItem?.fiscal?.icms_cst || '',
      icms_aliquota: editingItem?.fiscal?.icms_aliquota || '',
      pis_cst: editingItem?.fiscal?.pis_cst || '',
      pis_aliquota: editingItem?.fiscal?.pis_aliquota || '',
      cofins_cst: editingItem?.fiscal?.cofins_cst || '',
      cofins_aliquota: editingItem?.fiscal?.cofins_aliquota || '',
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    // Handle nested properties
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{editingItem ? 'Editar Item' : 'Novo Item'}</h2>
        <div className="flex gap-2">
          <Button type="submit" className="gap-1">
            <Save size={18} />
            Salvar
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="gap-1">
            <X size={18} />
            Cancelar
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)] pr-4">
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic" className="gap-2">
              <Info size={16} />
              Básico
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package size={16} />
              Estoque
            </TabsTrigger>
            <TabsTrigger value="fiscal" className="gap-2">
              <Receipt size={16} />
              Fiscal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="codigo">Código</Label>
                    <Input
                      id="codigo"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleChange}
                      placeholder="Código do item"
                    />
                  </div>
                  <div>
                    <Label htmlFor="grupo">Grupo</Label>
                    <Select
                      value={formData.grupo}
                      onValueChange={(value) => handleSelectChange(value, 'grupo')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informatica">Informática</SelectItem>
                        <SelectItem value="moveis">Móveis</SelectItem>
                        <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      placeholder="Descrição detalhada do item"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unidade">Unidade</Label>
                    <Select
                      value={formData.unidade}
                      onValueChange={(value) => handleSelectChange(value, 'unidade')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">Unidade (UN)</SelectItem>
                        <SelectItem value="KG">Kilograma (KG)</SelectItem>
                        <SelectItem value="LT">Litro (LT)</SelectItem>
                        <SelectItem value="M">Metro (M)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      name="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={handleChange}
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estoque_minimo">Estoque Mínimo</Label>
                    <Input
                      id="estoque_minimo"
                      name="estoque.estoque_minimo"
                      type="number"
                      value={formData.estoque.estoque_minimo}
                      onChange={handleChange}
                      placeholder="Quantidade mínima"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estoque_maximo">Estoque Máximo</Label>
                    <Input
                      id="estoque_maximo"
                      name="estoque.estoque_maximo"
                      type="number"
                      value={formData.estoque.estoque_maximo}
                      onChange={handleChange}
                      placeholder="Quantidade máxima"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiscal" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ncm">NCM</Label>
                    <Input
                      id="ncm"
                      name="fiscal.ncm"
                      value={formData.fiscal.ncm}
                      onChange={handleChange}
                      placeholder="NCM do produto"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cest">CEST (opcional)</Label>
                    <Input
                      id="cest"
                      name="fiscal.cest"
                      value={formData.fiscal.cest}
                      onChange={handleChange}
                      placeholder="CEST do produto"
                    />
                  </div>
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Select
                      value={formData.fiscal.origem}
                      onValueChange={(value) => handleSelectChange(value, 'fiscal.origem')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 - Nacional</SelectItem>
                        <SelectItem value="1">1 - Estrangeira - Importação direta</SelectItem>
                        <SelectItem value="2">2 - Estrangeira - Adquirida no mercado interno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">ICMS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="icms_cst">CST</Label>
                      <Select
                        value={formData.fiscal.icms_cst}
                        onValueChange={(value) => handleSelectChange(value, 'fiscal.icms_cst')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o CST" />
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
                      <Label htmlFor="icms_aliquota">Alíquota (%)</Label>
                      <Input
                        id="icms_aliquota"
                        name="fiscal.icms_aliquota"
                        type="number"
                        step="0.01"
                        value={formData.fiscal.icms_aliquota}
                        onChange={handleChange}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">PIS/COFINS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pis_cst">CST PIS</Label>
                      <Select
                        value={formData.fiscal.pis_cst}
                        onValueChange={(value) => handleSelectChange(value, 'fiscal.pis_cst')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o CST" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01 - Operação Tributável</SelectItem>
                          <SelectItem value="04">04 - Operação Isenta</SelectItem>
                          <SelectItem value="06">06 - Operação com Suspensão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pis_aliquota">Alíquota PIS (%)</Label>
                      <Input
                        id="pis_aliquota"
                        name="fiscal.pis_aliquota"
                        type="number"
                        step="0.01"
                        value={formData.fiscal.pis_aliquota}
                        onChange={handleChange}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cofins_cst">CST COFINS</Label>
                      <Select
                        value={formData.fiscal.cofins_cst}
                        onValueChange={(value) => handleSelectChange(value, 'fiscal.cofins_cst')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o CST" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">01 - Operação Tributável</SelectItem>
                          <SelectItem value="04">04 - Operação Isenta</SelectItem>
                          <SelectItem value="06">06 - Operação com Suspensão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cofins_aliquota">Alíquota COFINS (%)</Label>
                      <Input
                        id="cofins_aliquota"
                        name="fiscal.cofins_aliquota"
                        type="number"
                        step="0.01"
                        value={formData.fiscal.cofins_aliquota}
                        onChange={handleChange}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </form>
  );
};

export default ItemForm;
