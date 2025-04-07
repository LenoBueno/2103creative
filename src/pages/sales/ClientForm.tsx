import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from '@/components/layout/MainLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SaveIcon, PlusIcon, Trash2, Paperclip } from "lucide-react";
import {
  Client,
  GENDER_OPTIONS,
  UF_OPTIONS,
  IE_INDICATOR_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  BANK_OPTIONS
} from "@/types/client";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado do cliente
  const [client, setClient] = useState<Partial<Client>>({
    isActive: true,
    type: 'physical',
    creditLimit: 0,
    issWithheld: false,
    isFinalConsumer: true,
    isRuralProducer: false,
    addresses: [],
    contacts: [],
    bankAccounts: [],
    documents: [],
    credits: [],
    history: []
  });

  // Estados para controlar inputs de campos monetários
  const [isCreditLimitFocused, setIsCreditLimitFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setClient(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleTypeChange = (value: 'physical' | 'legal') => {
    setClient(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleCancel = () => {
    navigate("/sales/customers");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvar
    navigate("/sales/customers");
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {id ? "Editar Cliente" : "Novo Cliente"}
          </h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="isActive" className="cursor-pointer">
              {client.isActive ? "Ativo" : "Inativo"}
            </Label>
            <Switch 
              id="isActive"
              checked={client.isActive}
              onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Ficha Cadastral</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Tipo de Pessoa */}
                <div>
                  <Label className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tipo de Pessoa
                  </Label>
                  <RadioGroup defaultValue={client.type} className="flex gap-2 mt-2" onValueChange={handleTypeChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" className="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                      <Label htmlFor="physical" className="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Física</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="legal" id="legal" className="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                      <Label htmlFor="legal" className="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jurídica</Label>
                    </div>
                  </RadioGroup>
                </div>

                {client.type === 'physical' ? (
                  <>
                    {/* Nome */}
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nome
                      </Label>
                      <Input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={client.name || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* Sobrenome */}
                    <div>
                      <Label htmlFor="surname" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Sobrenome
                      </Label>
                      <Input 
                        type="text" 
                        id="surname" 
                        name="surname"
                        value={client.surname || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full"
                      />
                    </div>
                    {/* CPF */}
                    <div>
                      <Label htmlFor="cpf" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        CPF
                      </Label>
                      <Input 
                        type="text" 
                        id="cpf" 
                        name="cpf"
                        value={client.cpf || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* RG */}
                    <div>
                      <Label htmlFor="rg" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        RG
                      </Label>
                      <Input 
                        type="text" 
                        id="rg"
                        name="rg"
                        value={client.rg || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* Orgão Expedidor */}
                    <div>
                      <Label htmlFor="issuer" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Orgão Expedidor
                      </Label>
                      <Input 
                        type="text" 
                        id="issuer"
                        name="issuer"
                        value={client.issuer || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* UF */}
                    <div>
                      <Label htmlFor="uf" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        UF
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("uf", value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione" defaultValue={client.uf || ''} />
                        </SelectTrigger>
                        <SelectContent>
                          {UF_OPTIONS.map((uf) => (
                            <SelectItem key={uf.value} value={uf.value}>{uf.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Gênero */}
                    <div>
                      <Label htmlFor="gender" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Gênero
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione" defaultValue={client.gender || ''} />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDER_OPTIONS.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Data de Nascimento */}
                    <div>
                      <Label htmlFor="birthday" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Data de Nascimento
                      </Label>
                      <Input 
                        type="date" 
                        id="birthday"
                        name="birthday"
                        value={client.birthday || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Razão Social */}
                    <div>
                      <Label htmlFor="companyName" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Razão Social
                      </Label>
                      <Input 
                        type="text" 
                        id="companyName"
                        name="companyName"
                        value={client.companyName || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* Nome Fantasia */}
                    <div>
                      <Label htmlFor="tradeName" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nome Fantasia
                      </Label>
                      <Input 
                        type="text" 
                        id="tradeName"
                        name="tradeName"
                        value={client.tradeName || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* CNPJ */}
                    <div>
                      <Label htmlFor="cnpj" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        CNPJ
                      </Label>
                      <Input 
                        type="text" 
                        id="cnpj"
                        name="cnpj"
                        value={client.cnpj || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* Indicador de IE */}
                    <div>
                      <Label htmlFor="ieIndicator" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Indicador de IE
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("ieIndicator", value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Selecione" defaultValue={client.ieIndicator || ''} />
                        </SelectTrigger>
                        <SelectContent>
                          {IE_INDICATOR_OPTIONS.map((indicator) => (
                            <SelectItem key={indicator.value} value={indicator.value}>{indicator.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Inscrição Estadual */}
                    <div>
                      <Label htmlFor="stateRegistration" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Inscrição Estadual
                      </Label>
                      <Input 
                        type="text" 
                        id="stateRegistration"
                        name="stateRegistration"
                        value={client.stateRegistration || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                    {/* Inscrição Municipal */}
                    <div>
                      <Label htmlFor="municipalRegistration" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Inscrição Municipal
                      </Label>
                      <Input 
                        type="text" 
                        id="municipalRegistration"
                        name="municipalRegistration"
                        value={client.municipalRegistration || ''}
                        onChange={handleInputChange}
                        className="mt-1 w-full" 
                      />
                    </div>
                  </>
                )}

                {/* Telefone */}
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Telefone
                  </Label>
                  <Input 
                    type="text" 
                    id="phone"
                    name="phone"
                    value={client.phone || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
                {/* Celular */}
                <div>
                  <Label htmlFor="mobile" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Celular
                  </Label>
                  <Input 
                    type="text" 
                    id="mobile"
                    name="mobile"
                    value={client.mobile || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email"
                    value={client.email || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
                {/* Website */}
                <div>
                  <Label htmlFor="website" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Website
                  </Label>
                  <Input 
                    type="url" 
                    id="website"
                    name="website"
                    value={client.website || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
                {/* Observação */}
                <div className="md:col-span-2">
                  <Label htmlFor="observation" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Observação
                  </Label>
                  <Textarea 
                    id="observation"
                    name="observation"
                    value={client.observation || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
                {/* Limite de Crédito */}
                <div>
                  <Label htmlFor="creditLimit" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Limite de Crédito
                  </Label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      R$
                    </div>
                    <Input
                      type="number"
                      id="creditLimit"
                      name="creditLimit"
                      value={client.creditLimit?.toString() || ''}
                      onChange={handleNumberInputChange}
                      className="w-full pl-7"
                      onFocus={() => setIsCreditLimitFocused(true)}
                      onBlur={() => setIsCreditLimitFocused(false)}
                    />
                  </div>
                </div>
                {/* Consumidor Final */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isFinalConsumer" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Consumidor Final
                    </Label>
                    <Switch 
                      id="isFinalConsumer"
                      checked={client.isFinalConsumer}
                      onCheckedChange={(checked) => handleSwitchChange("isFinalConsumer", checked)}
                    />
                  </div>
                </div>
                {/* Produtor Rural */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isRuralProducer" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Produtor Rural
                    </Label>
                    <Switch 
                      id="isRuralProducer"
                      checked={client.isRuralProducer}
                      onCheckedChange={(checked) => handleSwitchChange("isRuralProducer", checked)}
                    />
                  </div>
                </div>
                {/* Retenção de ISS */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="issWithheld" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Retenção de ISS
                    </Label>
                    <Switch 
                      id="issWithheld"
                      checked={client.issWithheld}
                      onCheckedChange={(checked) => handleSwitchChange("issWithheld", checked)}
                    />
                  </div>
                </div>
                {/* Email para NFe */}
                <div>
                  <Label htmlFor="nfeEmail" className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email para NFe
                  </Label>
                  <Input 
                    type="email" 
                    id="nfeEmail"
                    name="nfeEmail"
                    value={client.nfeEmail || ''}
                    onChange={handleInputChange}
                    className="mt-1 w-full" 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-black hover:bg-black/90 text-white"
            >
              <SaveIcon className="h-4 w-4" />
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ClientForm;
