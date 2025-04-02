
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  values: {
    codigo: string;
    descricao: string;
    detalhes: string;
    unidade: string;
    grupo: string;
    preco: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, field: string) => void;
}

const BasicInfoSection = ({ values, handleChange, handleSelectChange }: BasicInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="codigo">Código</Label>
        <Input
          id="codigo"
          name="codigo"
          value={values.codigo}
          onChange={handleChange}
          placeholder="Código do item"
        />
      </div>
      <div>
        <Label htmlFor="grupo">Grupo</Label>
        <Select
          value={values.grupo}
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
        <Input
          id="descricao"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
          placeholder="Descrição do item"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="detalhes">Detalhes</Label>
        <Textarea
          id="detalhes"
          name="detalhes"
          value={values.detalhes}
          onChange={handleChange}
          placeholder="Detalhes adicionais do item"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="unidade">Unidade</Label>
        <Select
          value={values.unidade}
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
          value={values.preco}
          onChange={handleChange}
          placeholder="0,00"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
