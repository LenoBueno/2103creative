
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OriginSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const OriginSelect = ({ value, onChange }: OriginSelectProps) => {
  return (
    <div>
      <Label htmlFor="origem">Origem</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value)}
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
  );
};

export default OriginSelect;
