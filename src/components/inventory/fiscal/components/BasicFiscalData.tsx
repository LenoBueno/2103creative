
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import NCMInput from '../NCMInput';
import OriginSelect from './OriginSelect';
import ICMSForm from './ICMSForm';
import PISCOFINSForm from './PISCOFINSForm';

interface BasicFiscalDataProps {
  values: {
    ncm: string;
    cest: string;
    origem: string;
    icms_cst: string;
    icms_aliquota: string;
    pis_cst: string;
    pis_aliquota: string;
    cofins_cst: string;
    cofins_aliquota: string;
  };
  onNcmChange: (value: string) => void;
  onCestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrigemChange: (value: string) => void;
  onIcmsCstChange: (value: string) => void;
  onIcmsAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPisCstChange: (value: string) => void;
  onPisAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCofinsCstChange: (value: string) => void;
  onCofinsAliquotaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loadTaxData: (ncm: string) => void;
}

const BasicFiscalData = ({
  values,
  onNcmChange,
  onCestChange,
  onOrigemChange,
  onIcmsCstChange,
  onIcmsAliquotaChange,
  onPisCstChange,
  onPisAliquotaChange,
  onCofinsCstChange,
  onCofinsAliquotaChange,
  loadTaxData
}: BasicFiscalDataProps) => {
  const handleNcmChange = (ncm: string) => {
    onNcmChange(ncm);
    loadTaxData(ncm);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Dados Fiscais Federais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NCMInput
            value={values.ncm}
            onChange={handleNcmChange}
          />
          
          <div>
            <Label htmlFor="cest">CEST (opcional)</Label>
            <Input
              id="cest"
              value={values.cest}
              onChange={onCestChange}
              placeholder="00.000.00"
            />
          </div>
          
          <OriginSelect 
            value={values.origem} 
            onChange={onOrigemChange} 
          />
        </div>

        <ICMSForm
          cst={values.icms_cst}
          aliquota={values.icms_aliquota}
          onCstChange={onIcmsCstChange}
          onAliquotaChange={onIcmsAliquotaChange}
        />

        <PISCOFINSForm
          pisCst={values.pis_cst}
          pisAliquota={values.pis_aliquota}
          cofinsCst={values.cofins_cst}
          cofinsAliquota={values.cofins_aliquota}
          onPisCstChange={onPisCstChange}
          onPisAliquotaChange={onPisAliquotaChange}
          onCofinsCstChange={onCofinsCstChange}
          onCofinsAliquotaChange={onCofinsAliquotaChange}
        />
      </CardContent>
    </Card>
  );
};

export default BasicFiscalData;
