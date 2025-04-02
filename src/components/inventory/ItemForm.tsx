
import React, { useState, FormEvent } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Receipt, Package } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FiscalSection from './fiscal/FiscalSection';
import BasicInfoSection from './sections/BasicInfoSection';
import InventorySection from './sections/InventorySection';
import ItemFormHeader from './ItemFormHeader';

interface ItemFormProps {
  onClose: () => void;
  onSave: (item: any) => void;
  editingItem?: any;
}

const ItemForm = ({ onClose, onSave, editingItem }: ItemFormProps) => {
  const [formData, setFormData] = useState({
    codigo: editingItem?.codigo || '',
    descricao: editingItem?.descricao || '',
    detalhes: editingItem?.detalhes || '',
    unidade: editingItem?.unidade || 'UN',
    grupo: editingItem?.grupo || '',
    preco: editingItem?.valor?.toString() || '',
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
      configEstado: editingItem?.fiscal?.configEstado || {
        RS: {}
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
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

  const handleFiscalChange = (fiscalValues: any) => {
    setFormData(prev => ({
      ...prev,
      fiscal: {
        ...prev.fiscal,
        ...fiscalValues
      }
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Transformar o formData para o formato esperado de Produto
    const produtoData = {
      ...formData,
      preco: parseFloat(formData.preco) || 0,
      impostos: {
        icms: {
          cst: formData.fiscal.icms_cst,
          aliquota: parseFloat(formData.fiscal.icms_aliquota) || 0
        },
        pis: {
          cst: formData.fiscal.pis_cst,
          aliquota: parseFloat(formData.fiscal.pis_aliquota) || 0
        },
        cofins: {
          cst: formData.fiscal.cofins_cst,
          aliquota: parseFloat(formData.fiscal.cofins_aliquota) || 0
        }
      },
      ncm: formData.fiscal.ncm,
      cest: formData.fiscal.cest,
      origem: formData.fiscal.origem,
      configEstado: formData.fiscal.configEstado
    };
    
    onSave(produtoData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ItemFormHeader 
        title={editingItem ? 'Editar Item' : 'Novo Item'}
        onSave={handleSubmit}
        onCancel={onClose}
      />

      <ScrollArea className="h-[calc(100vh-220px)] pr-4">
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic" className="gap-2">
              <Info size={16} />
              Básico
            </TabsTrigger>
            <TabsTrigger value="fiscal" className="gap-2">
              <Receipt size={16} />
              Fiscal
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package size={16} />
              Estoque
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <BasicInfoSection 
                  values={{
                    codigo: formData.codigo,
                    descricao: formData.descricao,
                    detalhes: formData.detalhes,
                    unidade: formData.unidade,
                    grupo: formData.grupo,
                    preco: formData.preco,
                  }}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiscal">
            <FiscalSection 
              initialValues={{
                ncm: formData.fiscal.ncm,
                cest: formData.fiscal.cest,
                origem: formData.fiscal.origem,
                icms_cst: formData.fiscal.icms_cst,
                icms_aliquota: formData.fiscal.icms_aliquota,
                pis_cst: formData.fiscal.pis_cst,
                pis_aliquota: formData.fiscal.pis_aliquota,
                cofins_cst: formData.fiscal.cofins_cst,
                cofins_aliquota: formData.fiscal.cofins_aliquota,
                configEstado: formData.fiscal.configEstado
              }}
              onChange={handleFiscalChange}
            />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <InventorySection
                  values={{
                    estoque: {
                      estoque_minimo: formData.estoque.estoque_minimo,
                      estoque_maximo: formData.estoque.estoque_maximo
                    }
                  }}
                  handleChange={handleChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </form>
  );
};

export default ItemForm;
