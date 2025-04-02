
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ICMSFormProps {
  cst: string;
  aliquota: string;
  onCstChange: (value: string) => void;
  onAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ICMSForm = ({ cst, aliquota, onCstChange, onAliquotaChange }: ICMSFormProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">ICMS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icms_cst">CST</Label>
          <Select
            value={cst}
            onValueChange={onCstChange}
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
            type="number"
            step="0.01"
            value={aliquota}
            onChange={onAliquotaChange}
            placeholder="0,00"
          />
        </div>
      </div>
    </div>
  );
};

export default ICMSForm;
