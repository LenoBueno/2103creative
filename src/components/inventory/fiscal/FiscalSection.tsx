
import { useState } from 'react';
import BasicFiscalData from './components/BasicFiscalData';
import ICMSRSForm from './ICMSRSForm';
import { useFiscalData } from './hooks/useFiscalData';

interface FiscalSectionProps {
  onChange: (values: any) => void;
  initialValues?: any;
}

const FiscalSection = ({ onChange, initialValues = {} }: FiscalSectionProps) => {
  // Estado da empresa simulado - em uma aplicação real, viria do context ou de uma API
  const [empresa] = useState({ estado: 'RS' });
  
  const { values, handleChange, handleRSConfigChange, loadTaxData } = useFiscalData({
    initialValues,
    onChange
  });

  return (
    <div className="space-y-6">
      <BasicFiscalData
        values={values}
        onNcmChange={(value) => handleChange('ncm', value)}
        onCestChange={(e) => handleChange('cest', e.target.value)}
        onOrigemChange={(value) => handleChange('origem', value)}
        onIcmsCstChange={(value) => handleChange('icms_cst', value)}
        onIcmsAliquotaChange={(e) => handleChange('icms_aliquota', e.target.value)}
        onPisCstChange={(value) => handleChange('pis_cst', value)}
        onPisAliquotaChange={(e) => handleChange('pis_aliquota', e.target.value)}
        onCofinsCstChange={(value) => handleChange('cofins_cst', value)}
        onCofinsAliquotaChange={(e) => handleChange('cofins_aliquota', e.target.value)}
        loadTaxData={loadTaxData}
      />

      {/* Estado-specific configurations */}
      {empresa.estado === 'RS' && (
        <ICMSRSForm 
          initialValues={values.configEstado.RS}
          onChange={handleRSConfigChange}
        />
      )}
    </div>
  );
};

export default FiscalSection;
