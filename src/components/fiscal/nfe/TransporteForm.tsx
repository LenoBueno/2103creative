
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TransporteFormProps {
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const TransporteForm = ({ values, handleChange, handleSelectChange }: TransporteFormProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-4">Informações de Transporte</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="transporte.modalidade">Modalidade de Frete</Label>
            <Select 
              value={values.transporte?.modalidade?.toString() || '0'} 
              onValueChange={(value) => handleSelectChange("transporte.modalidade", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Por conta do Emitente</SelectItem>
                <SelectItem value="1">1 - Por conta do Destinatário</SelectItem>
                <SelectItem value="2">2 - Por conta de Terceiros</SelectItem>
                <SelectItem value="9">9 - Sem Frete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {values.transporte?.modalidade !== 9 && values.transporte?.modalidade !== '9' && (
          <>
            <h4 className="font-medium text-base mt-6 mb-3">Transportadora</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="transporte.transportadora.nome">Nome / Razão Social</Label>
                <Input
                  id="transporte.transportadora.nome"
                  name="transporte.transportadora.nome"
                  value={values.transporte?.transportadora?.nome || ''}
                  onChange={handleChange}
                  placeholder="Nome da transportadora"
                />
              </div>
              <div>
                <Label htmlFor="transporte.transportadora.cnpj">CNPJ</Label>
                <Input
                  id="transporte.transportadora.cnpj"
                  name="transporte.transportadora.cnpj"
                  value={values.transporte?.transportadora?.cnpj || ''}
                  onChange={handleChange}
                  placeholder="CNPJ da transportadora"
                />
              </div>
              <div>
                <Label htmlFor="transporte.transportadora.inscricaoEstadual">Inscrição Estadual</Label>
                <Input
                  id="transporte.transportadora.inscricaoEstadual"
                  name="transporte.transportadora.inscricaoEstadual"
                  value={values.transporte?.transportadora?.inscricaoEstadual || ''}
                  onChange={handleChange}
                  placeholder="IE da transportadora"
                />
              </div>
            </div>

            <h4 className="font-medium text-base mt-6 mb-3">Veículo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transporte.veiculo.placa">Placa</Label>
                <Input
                  id="transporte.veiculo.placa"
                  name="transporte.veiculo.placa"
                  value={values.transporte?.veiculo?.placa || ''}
                  onChange={handleChange}
                  placeholder="Placa do veículo"
                />
              </div>
              <div>
                <Label htmlFor="transporte.veiculo.uf">UF</Label>
                <Select 
                  value={values.transporte?.veiculo?.uf || ''} 
                  onValueChange={(value) => handleSelectChange("transporte.veiculo.uf", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
                      'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                      <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h4 className="font-medium text-base mt-6 mb-3">Volumes</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="transporte.volumes.quantidade">Quantidade</Label>
                <Input
                  id="transporte.volumes.quantidade"
                  name="transporte.volumes.quantidade"
                  type="number"
                  value={values.transporte?.volumes?.quantidade || ''}
                  onChange={handleChange}
                  placeholder="Quantidade"
                />
              </div>
              <div>
                <Label htmlFor="transporte.volumes.especie">Espécie</Label>
                <Input
                  id="transporte.volumes.especie"
                  name="transporte.volumes.especie"
                  value={values.transporte?.volumes?.especie || ''}
                  onChange={handleChange}
                  placeholder="Ex: Caixa, Volume"
                />
              </div>
              <div>
                <Label htmlFor="transporte.volumes.marca">Marca</Label>
                <Input
                  id="transporte.volumes.marca"
                  name="transporte.volumes.marca"
                  value={values.transporte?.volumes?.marca || ''}
                  onChange={handleChange}
                  placeholder="Marca"
                />
              </div>
              <div>
                <Label htmlFor="transporte.volumes.numeracao">Numeração</Label>
                <Input
                  id="transporte.volumes.numeracao"
                  name="transporte.volumes.numeracao"
                  value={values.transporte?.volumes?.numeracao || ''}
                  onChange={handleChange}
                  placeholder="Numeração"
                />
              </div>
              <div>
                <Label htmlFor="transporte.volumes.pesoBruto">Peso Bruto (kg)</Label>
                <Input
                  id="transporte.volumes.pesoBruto"
                  name="transporte.volumes.pesoBruto"
                  type="number"
                  step="0.001"
                  value={values.transporte?.volumes?.pesoBruto || ''}
                  onChange={handleChange}
                  placeholder="Peso Bruto"
                />
              </div>
              <div>
                <Label htmlFor="transporte.volumes.pesoLiquido">Peso Líquido (kg)</Label>
                <Input
                  id="transporte.volumes.pesoLiquido"
                  name="transporte.volumes.pesoLiquido"
                  type="number"
                  step="0.001"
                  value={values.transporte?.volumes?.pesoLiquido || ''}
                  onChange={handleChange}
                  placeholder="Peso Líquido"
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransporteForm;
