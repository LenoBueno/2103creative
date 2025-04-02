
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface ItemFormHeaderProps {
  title: string;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ItemFormHeader = ({ title, onSave, onCancel }: ItemFormHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Button type="submit" className="gap-1">
          <Save size={18} />
          Salvar
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="gap-1">
          <X size={18} />
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ItemFormHeader;
