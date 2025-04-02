
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PISCOFINSFormProps {
  pisCst: string;
  pisAliquota: string;
  cofinsCst: string;
  cofinsAliquota: string;
  onPisCstChange: (value: string) => void;
  onPisAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCofinsCstChange: (value: string) => void;
  onCofinsAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PISCOFINSForm = ({
  pisCst,
  pisAliquota,
  cofinsCst,
  cofinsAliquota,
  onPisCstChange,
  onPisAliquotaChange,
  onCofinsCstChange,
  onCofinsAliquotaChange
}: PISCOFINSFormProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">PIS/COFINS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pis_cst">CST PIS</Label>
          <Select
            value={pisCst}
            onValueChange={onPisCstChange}
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
            type="number"
            step="0.01"
            value={pisAliquota}
            onChange={onPisAliquotaChange}
            placeholder="0,00"
          />
        </div>
        <div>
          <Label htmlFor="cofins_cst">CST COFINS</Label>
          <Select
            value={cofinsCst}
            onValueChange={onCofinsCstChange}
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
            type="number"
            step="0.01"
            value={cofinsAliquota}
            onChange={onCofinsAliquotaChange}
            placeholder="0,00"
          />
        </div>
      </div>
    </div>
  );
};

export default PISCOFINSForm;
