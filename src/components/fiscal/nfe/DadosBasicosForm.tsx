
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface DadosBasicosFormProps {
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const DadosBasicosForm = ({ values, handleChange, handleSelectChange }: DadosBasicosFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Dados da Nota Fiscal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Select 
                value={values.modelo} 
                onValueChange={(value) => handleSelectChange("modelo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="55">NF-e (55)</SelectItem>
                  <SelectItem value="65">NFC-e (65)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="serie">Série</Label>
              <Input
                id="serie"
                name="serie"
                value={values.serie}
                onChange={handleChange}
                placeholder="Série"
              />
            </div>
            <div>
              <Label htmlFor="naturezaOperacao">Natureza da Operação</Label>
              <Input
                id="naturezaOperacao"
                name="naturezaOperacao"
                value={values.naturezaOperacao}
                onChange={handleChange}
                placeholder="Venda, Devolução, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Destinatário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destinatario.tipo">Tipo</Label>
              <Select 
                value={values.destinatario?.tipo || 'CNPJ'} 
                onValueChange={(value) => handleSelectChange("destinatario.tipo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPF">Pessoa Física (CPF)</SelectItem>
                  <SelectItem value="CNPJ">Pessoa Jurídica (CNPJ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destinatario.numero">
                {values.destinatario?.tipo === 'CPF' ? 'CPF' : 'CNPJ'}
              </Label>
              <Input
                id="destinatario.numero"
                name="destinatario.numero"
                value={values.destinatario?.numero || ''}
                onChange={handleChange}
                placeholder={values.destinatario?.tipo === 'CPF' ? 'CPF' : 'CNPJ'}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="destinatario.nome">Nome / Razão Social</Label>
              <Input
                id="destinatario.nome"
                name="destinatario.nome"
                value={values.destinatario?.nome || ''}
                onChange={handleChange}
                placeholder="Nome completo ou razão social"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.inscricaoEstadual">Inscrição Estadual</Label>
              <Input
                id="destinatario.inscricaoEstadual"
                name="destinatario.inscricaoEstadual"
                value={values.destinatario?.inscricaoEstadual || ''}
                onChange={handleChange}
                placeholder="Inscrição Estadual (opcional para CPF)"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.email">E-mail</Label>
              <Input
                id="destinatario.email"
                name="destinatario.email"
                value={values.destinatario?.email || ''}
                onChange={handleChange}
                placeholder="E-mail para envio da NF-e"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Endereço do Destinatário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="destinatario.endereco.logradouro">Logradouro</Label>
              <Input
                id="destinatario.endereco.logradouro"
                name="destinatario.endereco.logradouro"
                value={values.destinatario?.endereco?.logradouro || ''}
                onChange={handleChange}
                placeholder="Rua, Avenida, etc."
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.numero">Número</Label>
              <Input
                id="destinatario.endereco.numero"
                name="destinatario.endereco.numero"
                value={values.destinatario?.endereco?.numero || ''}
                onChange={handleChange}
                placeholder="Número"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.complemento">Complemento</Label>
              <Input
                id="destinatario.endereco.complemento"
                name="destinatario.endereco.complemento"
                value={values.destinatario?.endereco?.complemento || ''}
                onChange={handleChange}
                placeholder="Complemento (opcional)"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.bairro">Bairro</Label>
              <Input
                id="destinatario.endereco.bairro"
                name="destinatario.endereco.bairro"
                value={values.destinatario?.endereco?.bairro || ''}
                onChange={handleChange}
                placeholder="Bairro"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.cep">CEP</Label>
              <Input
                id="destinatario.endereco.cep"
                name="destinatario.endereco.cep"
                value={values.destinatario?.endereco?.cep || ''}
                onChange={handleChange}
                placeholder="CEP"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.cidade">Cidade</Label>
              <Input
                id="destinatario.endereco.cidade"
                name="destinatario.endereco.cidade"
                value={values.destinatario?.endereco?.cidade || ''}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </div>
            <div>
              <Label htmlFor="destinatario.endereco.uf">UF</Label>
              <Select 
                value={values.destinatario?.endereco?.uf || ''} 
                onValueChange={(value) => handleSelectChange("destinatario.endereco.uf", value)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DadosBasicosForm;
