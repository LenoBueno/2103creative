
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import NCMInput from './NCMInput';
import ICMSRSForm from './ICMSRSForm';

interface FiscalSectionProps {
  onChange: (values: any) => void;
  initialValues?: any;
}

const FiscalSection = ({ onChange, initialValues = {} }: FiscalSectionProps) => {
  // Estado da empresa simulado - em uma aplicação real, viria do context ou de uma API
  const [empresa] = useState({ estado: 'RS' });
  
  // Estado local do formulário
  const [values, setValues] = useState({
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

  // Efeito para notificar o componente pai sobre alterações
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  const handleChange = (field: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para carregar dados fiscais com base no NCM
  const loadTaxData = async (ncm: string) => {
    console.log("Carregando dados fiscais para NCM:", ncm);
    // Em um cenário real, aqui faria uma chamada à API
    // Por enquanto, apenas atualiza o estado com valores padrão
    if (ncm && ncm.length >= 8) {
      // Simular carregamento de dados fiscais
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

  const handleRSConfigChange = (rsValues: any) => {
    setValues(prev => ({
      ...prev,
      configEstado: {
        ...prev.configEstado,
        RS: rsValues
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Dados Fiscais Federais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NCMInput
              value={values.ncm}
              onChange={(ncm) => {
                handleChange('ncm', ncm);
                loadTaxData(ncm);
              }}
            />
            
            <div>
              <Label htmlFor="cest">CEST (opcional)</Label>
              <Input
                id="cest"
                value={values.cest}
                onChange={(e) => handleChange('cest', e.target.value)}
                placeholder="00.000.00"
              />
            </div>
            
            <div>
              <Label htmlFor="origem">Origem</Label>
              <Select
                value={values.origem}
                onValueChange={(value) => handleChange('origem', value)}
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
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">ICMS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icms_cst">CST</Label>
                <Select
                  value={values.icms_cst}
                  onValueChange={(value) => handleChange('icms_cst', value)}
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
                  value={values.icms_aliquota}
                  onChange={(e) => handleChange('icms_aliquota', e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">PIS/COFINS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pis_cst">CST PIS</Label>
                <Select
                  value={values.pis_cst}
                  onValueChange={(value) => handleChange('pis_cst', value)}
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
                  value={values.pis_aliquota}
                  onChange={(e) => handleChange('pis_aliquota', e.target.value)}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="cofins_cst">CST COFINS</Label>
                <Select
                  value={values.cofins_cst}
                  onValueChange={(value) => handleChange('cofins_cst', value)}
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
                  value={values.cofins_aliquota}
                  onChange={(e) => handleChange('cofins_aliquota', e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações Específicas por Estado */}
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
