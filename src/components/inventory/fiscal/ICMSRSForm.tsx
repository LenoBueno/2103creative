
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ICMSRSFormProps {
  onChange?: (values: any) => void;
  initialValues?: any;
}

const ICMSRSForm = ({ onChange, initialValues = {} }: ICMSRSFormProps) => {
  const [values, setValues] = useState({
    difal: initialValues.difal || false,
    aliquotaInterna: initialValues.aliquotaInterna || 18,
    ...initialValues
  });

  const handleChange = (field: string, value: any) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    onChange?.(newValues);
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Configurações específicas ICMS-RS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="difal" className="flex-1">Aplicar DIFAL</Label>
            <Switch
              id="difal"
              checked={values.difal}
              onCheckedChange={(checked) => handleChange('difal', checked)}
            />
          </div>
          
          <div>
            <Label htmlFor="aliquotaInterna">Alíquota Interna RS (%)</Label>
            <Input
              id="aliquotaInterna"
              type="number"
              step="0.01"
              value={values.aliquotaInterna}
              onChange={(e) => handleChange('aliquotaInterna', parseFloat(e.target.value))}
              placeholder="18.00"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ICMSRSForm;
