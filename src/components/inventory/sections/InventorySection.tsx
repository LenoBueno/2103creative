
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InventorySectionProps {
  values: {
    estoque: {
      estoque_minimo: string | number;
      estoque_maximo: string | number;
    }
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InventorySection = ({ values, handleChange }: InventorySectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="estoque_minimo">Estoque Mínimo</Label>
        <Input
          id="estoque_minimo"
          name="estoque.estoque_minimo"
          type="number"
          value={values.estoque.estoque_minimo}
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
          value={values.estoque.estoque_maximo}
          onChange={handleChange}
          placeholder="Quantidade máxima"
        />
      </div>
    </div>
  );
};

export default InventorySection;
