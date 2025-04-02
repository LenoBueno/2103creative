
import { useState, useEffect } from 'react';

interface FiscalDataState {
  ncm: string;
  cest: string;
  origem: string;
  icms_cst: string;
  icms_aliquota: string;
  pis_cst: string;
  pis_aliquota: string;
  cofins_cst: string;
  cofins_aliquota: string;
  configEstado: {
    RS: any;
  };
}

interface UseFiscalDataProps {
  initialValues?: any;
  onChange: (values: any) => void;
}

export function useFiscalData({ initialValues = {}, onChange }: UseFiscalDataProps) {
  const [values, setValues] = useState<FiscalDataState>({
    ncm: initialValues.ncm || '',
    cest: initialValues.cest || '',
    origem: initialValues.origem || '0',
    icms_cst: initialValues.icms_cst || '',
    icms_aliquota: initialValues.icms_aliquota || '',
    pis_cst: initialValues.pis_cst || '',
    pis_aliquota: initialValues.pis_aliquota || '',
    cofins_cst: initialValues.cofins_cst || '',
    cofins_aliquota: initialValues.cofins_aliquota || '',
    configEstado: {
      RS: initialValues.configEstado?.RS || {}
    }
  });

  // Notify parent component when values change
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  const handleChange = (field: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRSConfigChange = (rsValues: any) => {
    setValues(prev => ({
      ...prev,
      configEstado: {
        ...prev.configEstado,
        RS: rsValues
      }
    }));
  };

  // Function to load tax data based on NCM
  const loadTaxData = async (ncm: string) => {
    console.log("Carregando dados fiscais para NCM:", ncm);
    // In a real scenario, this would call an API
    // For now, we're just updating the state with default values
    if (ncm && ncm.length >= 8) {
      // Simulate loading tax data
      setTimeout(() => {
        setValues(prev => ({
          ...prev,
          icms_cst: '00',
          icms_aliquota: '18',
          pis_cst: '01',
          pis_aliquota: '1.65',
          cofins_cst: '01',
          cofins_aliquota: '7.6'
        }));
      }, 500);
    }
  };

  return {
    values,
    handleChange,
    handleRSConfigChange,
    loadTaxData
  };
}
