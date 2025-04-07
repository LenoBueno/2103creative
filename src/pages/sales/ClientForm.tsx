import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/common/PageHeader";

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
        <PageHeader
          title={id ? "Editar Cliente" : "Novo Cliente"}
          description="Gerenciamento de informações do cliente"
          actions={
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
          }
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Ficha Cadastral</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <div className="bg-white rounded-md shadow p-6">
                <div className="mb-6">
                  <Label className="mb-2 block font-medium">Pessoa Física ou Jurídica?</Label>
                  <RadioGroup 
                    value={client.type} 
                    onValueChange={(value) => handleTypeChange(value as 'physical' | 'legal')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical">Pessoa Física</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="legal" id="legal" />
                      <Label htmlFor="legal">Pessoa Jurídica</Label>
                    </div>
                  </RadioGroup>
                </div>

                {client.type === 'physical' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          name="name"
                          value={client.name || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: João"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">Sobrenome</Label>
                        <Input
                          id="surname"
                          name="surname"
                          value={client.surname || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: Silva"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          value={client.cpf || ''}
                          onChange={handleInputChange}
                          placeholder="000.000.000-00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rg">RG</Label>
                        <Input
                          id="rg"
                          name="rg"
                          value={client.rg || ''}
                          onChange={handleInputChange}
                          placeholder="00.000.000-0"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="issuer">Emissor</Label>
                          <Input
                            id="issuer"
                            name="issuer"
                            value={client.issuer || ''}
                            onChange={handleInputChange}
                            placeholder="SSP"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="uf">UF</Label>
                          <Select 
                            value={client.uf || ''} 
                            onValueChange={(value) => handleSelectChange("uf", value)}
                          >
                            <SelectTrigger id="uf">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {UF_OPTIONS.map((uf) => (
                                <SelectItem key={uf.value} value={uf.value}>{uf.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Sexo</Label>
                        <Select 
                          value={client.gender || ''} 
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {GENDER_OPTIONS.map((gender) => (
                              <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Aniversário</Label>
                        <Input
                          id="birthday"
                          name="birthday"
                          type="date"
                          value={client.birthday || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Razão Social</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={client.companyName || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: Empresa Ltda"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tradeName">Nome Fantasia</Label>
                        <Input
                          id="tradeName"
                          name="tradeName"
                          value={client.tradeName || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: Empresa"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                          id="cnpj"
                          name="cnpj"
                          value={client.cnpj || ''}
                          onChange={handleInputChange}
                          placeholder="00.000.000/0000-00"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ieIndicator">Indicador da IE do destinatário</Label>
                        <Select 
                          value={client.ieIndicator || ''} 
                          onValueChange={(value) => handleSelectChange("ieIndicator", value)}
                        >
                          <SelectTrigger id="ieIndicator">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {IE_INDICATOR_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
                        <Input
                          id="stateRegistration"
                          name="stateRegistration"
                          value={client.stateRegistration || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: 123456789"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="municipalRegistration">Inscrição Municipal</Label>
                        <Input
                          id="municipalRegistration"
                          name="municipalRegistration"
                          value={client.municipalRegistration || ''}
                          onChange={handleInputChange}
                          placeholder="Ex: 123456789"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="text-lg font-medium">Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={client.phone || ''}
                        onChange={handleInputChange}
                        placeholder="(00) 0000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Celular</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        value={client.mobile || ''}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={client.email || ''}
                        onChange={handleInputChange}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Site</Label>
                      <Input
                        id="website"
                        name="website"
                        value={client.website || ''}
                        onChange={handleInputChange}
                        placeholder="Ex: http://www.site.com.br"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observation">Observação</Label>
                    <Textarea
                      id="observation"
                      name="observation"
                      value={client.observation || ''}
                      onChange={handleInputChange}
                      placeholder="Observações sobre o cliente..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="creditLimit">Limite de Crédito</Label>
                      <div className="relative">
                        <Input
                          id="creditLimit"
                          name="creditLimit"
                          type={isCreditLimitFocused ? "number" : "text"}
                          value={isCreditLimitFocused ? 
                            (client.creditLimit === 0 ? '' : client.creditLimit) : 
                            `${(client.creditLimit || 0).toFixed(2)}`}
                          onChange={handleNumberInputChange}
                          onFocus={() => setIsCreditLimitFocused(true)}
                          onBlur={() => setIsCreditLimitFocused(false)}
                          step="0.01"
                          min="0"
                          placeholder="0,00"
                          className="pl-7"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                          R$
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="text-lg font-medium">Dados Fiscais</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nfeEmail">E-mail do destinatário da NF-e</Label>
                    <Input
                      id="nfeEmail"
                      name="nfeEmail"
                      type="email"
                      value={client.nfeEmail || ''}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div className="border-t mt-4 pt-4">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center">
                        <span className="mr-2">ISS retido na fonte?</span>
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            id="issWithheldSim"
                            name="issWithheld"
                            className="h-4 w-4"
                            checked={client.issWithheld}
                            onChange={() => handleSwitchChange("issWithheld", true)}
                          />
                          <Label htmlFor="issWithheldSim" className="mr-4">Sim</Label>
                          <input
                            type="radio"
                            id="issWithheldNao"
                            name="issWithheld"
                            className="h-4 w-4"
                            checked={!client.issWithheld}
                            onChange={() => handleSwitchChange("issWithheld", false)}
                          />
                          <Label htmlFor="issWithheldNao">Não</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2">Consumidor final?</span>
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            id="isFinalConsumerSim"
                            name="isFinalConsumer"
                            className="h-4 w-4"
                            checked={client.isFinalConsumer}
                            onChange={() => handleSwitchChange("isFinalConsumer", true)}
                          />
                          <Label htmlFor="isFinalConsumerSim" className="mr-4">Sim</Label>
                          <input
                            type="radio"
                            id="isFinalConsumerNao"
                            name="isFinalConsumer"
                            className="h-4 w-4"
                            checked={!client.isFinalConsumer}
                            onChange={() => handleSwitchChange("isFinalConsumer", false)}
                          />
                          <Label htmlFor="isFinalConsumerNao">Não</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2">Produtor rural?</span>
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            id="isRuralProducerSim"
                            name="isRuralProducer"
                            className="h-4 w-4"
                            checked={client.isRuralProducer}
                            onChange={() => handleSwitchChange("isRuralProducer", true)}
                          />
                          <Label htmlFor="isRuralProducerSim" className="mr-4">Sim</Label>
                          <input
                            type="radio"
                            id="isRuralProducerNao"
                            name="isRuralProducer"
                            className="h-4 w-4"
                            checked={!client.isRuralProducer}
                            onChange={() => handleSwitchChange("isRuralProducer", false)}
                          />
                          <Label htmlFor="isRuralProducerNao">Não</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h3 className="text-lg font-medium">CARACTERÍSTICAS</h3>
                  
                  {/* Abas de Características - Implementando navegação entre abas */}
                  <div className="border-b mb-6">
                    <div className="flex overflow-x-auto">
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.remove('hidden');
                          document.getElementById('contatos-content')?.classList.add('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                          document.getElementById('documentos-content')?.classList.add('hidden');
                          document.getElementById('credito-content')?.classList.add('hidden');
                          document.getElementById('historico-content')?.classList.add('hidden');
                        }} 
                        className="px-4 py-2 bg-green-500 text-white font-medium"
                      >
                        ENDEREÇOS
                      </button>
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.add('hidden');
                          document.getElementById('contatos-content')?.classList.remove('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                          document.getElementById('documentos-content')?.classList.add('hidden');
                          document.getElementById('credito-content')?.classList.add('hidden');
                          document.getElementById('historico-content')?.classList.add('hidden');
                        }} 
                        className="px-4 py-2 bg-teal-600 text-white font-medium"
                      >
                        CONTATOS
                      </button>
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.add('hidden');
                          document.getElementById('contatos-content')?.classList.add('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.remove('hidden');
                          document.getElementById('documentos-content')?.classList.add('hidden');
                          document.getElementById('credito-content')?.classList.add('hidden');
                          document.getElementById('historico-content')?.classList.add('hidden');
                        }} 
                        className="px-4 py-2 bg-teal-600 text-white font-medium"
                      >
                        DADOS BANCÁRIOS
                      </button>
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.add('hidden');
                          document.getElementById('contatos-content')?.classList.add('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                          document.getElementById('documentos-content')?.classList.remove('hidden');
                          document.getElementById('credito-content')?.classList.add('hidden');
                          document.getElementById('historico-content')?.classList.add('hidden');
                        }} 
                        className="px-4 py-2 bg-teal-600 text-white font-medium"
                      >
                        DOCUMENTOS
                      </button>
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.add('hidden');
                          document.getElementById('contatos-content')?.classList.add('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                          document.getElementById('documentos-content')?.classList.add('hidden');
                          document.getElementById('credito-content')?.classList.remove('hidden');
                          document.getElementById('historico-content')?.classList.add('hidden');
                        }} 
                        className="px-4 py-2 bg-teal-600 text-white font-medium"
                      >
                        CRÉDITO
                      </button>
                      <button 
                        onClick={() => {
                          document.getElementById('enderecos-content')?.classList.add('hidden');
                          document.getElementById('contatos-content')?.classList.add('hidden');
                          document.getElementById('dadosBancarios-content')?.classList.add('hidden');
                          document.getElementById('documentos-content')?.classList.add('hidden');
                          document.getElementById('credito-content')?.classList.add('hidden');
                          document.getElementById('historico-content')?.classList.remove('hidden');
                        }} 
                        className="px-4 py-2 bg-teal-600 text-white font-medium"
                      >
                        HISTÓRICO
                      </button>
                    </div>
                  </div>
                  
                  
                  {/* Endereços */}
                  <div id="enderecos-content" className="mb-6">
                    <div className="grid grid-cols-12 gap-2 mb-2">
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <Label>CEP</Label>
                          <div className="ml-1 w-4 h-4 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs">?</div>
                        </div>
                        <div className="flex">
                          <Input placeholder="00000-000" className="rounded-r-none" />
                          <Button className="rounded-l-none bg-gray-300 hover:bg-gray-400 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="col-span-5">
                        <div className="flex justify-between">
                          <Label>Endereço</Label>
                          <div className="flex items-center gap-1">
                            <input type="checkbox" id="isForeign" className="h-4 w-4" />
                            <Label htmlFor="isForeign" className="text-xs cursor-pointer">no exterior</Label>
                          </div>
                        </div>
                        <Input placeholder="Rua, Avenida, etc" />
                      </div>
                      
                      <div className="col-span-1">
                        <Label>Nº</Label>
                        <Input placeholder="123" />
                      </div>
                      
                      <div className="col-span-2">
                        <Label>Complemento</Label>
                        <Input placeholder="Apto, Bloco, etc" />
                      </div>
                      
                      <div className="col-span-2">
                        <Label>Bairro</Label>
                        <Input placeholder="Bairro" />
                      </div>
                      
                      <div className="col-span-12 flex justify-end">
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white">OK</Button>
                      </div>
                    </div>
                    
                    <div className="text-center py-4 text-orange-600 font-medium">
                      NENHUM ENDEREÇO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                    </div>
                  </div>
                  
                  {/* Contatos */}
                  <div id="contatos-content" className="mb-6 hidden">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-black hover:bg-black/90 text-white ml-auto"
                        onClick={() => {/* Adicionar contato */}}
                      >
                        <PlusIcon className="h-4 w-4" /> Adicionar Contato
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input placeholder="Nome do contato" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input placeholder="Cargo" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input placeholder="(00) 0000-0000" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input placeholder="email@exemplo.com" />
                      </div>
                    </div>
                    
                    <div className="text-center py-4 text-orange-600 font-medium">
                      NENHUM CONTATO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                    </div>
                  </div>
                  
                  {/* Dados Bancários */}
                  <div id="dadosBancarios-content" className="mb-6 hidden">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-black hover:bg-black/90 text-white ml-auto"
                        onClick={() => {/* Adicionar conta */}}
                      >
                        <PlusIcon className="h-4 w-4" /> Adicionar Conta
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 mb-4">
                      <div className="col-span-4 space-y-2">
                        <Label>Banco</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um banco" />
                          </SelectTrigger>
                          <SelectContent>
                            {BANK_OPTIONS.map((bank) => (
                              <SelectItem key={bank.value} value={bank.value}>{bank.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-3 space-y-2">
                        <Label>Agência</Label>
                        <Input placeholder="Agência" />
                      </div>
                      
                      <div className="col-span-1 space-y-2">
                        <Label>Dígito</Label>
                        <Input placeholder="X" />
                      </div>
                      
                      <div className="col-span-3 space-y-2">
                        <Label>Conta</Label>
                        <Input placeholder="Conta" />
                      </div>
                      
                      <div className="col-span-1 space-y-2">
                        <Label>Dígito</Label>
                        <Input placeholder="X" />
                      </div>
                    </div>
                    
                    <div className="text-center py-4 text-orange-600 font-medium">
                      NENHUM DADO BANCÁRIO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                    </div>
                  </div>
                  
                  {/* Documentos */}
                  <div id="documentos-content" className="mb-6 hidden">
                    <div className="flex justify-between items-center mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-black hover:bg-black/90 text-white ml-auto"
                        onClick={() => {/* Adicionar documento */}}
                      >
                        <PlusIcon className="h-4 w-4" /> Adicionar Documento
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cenae">CENAE</SelectItem>
                            <SelectItem value="ie">Inscrição Estadual</SelectItem>
                            <SelectItem value="iest">Inscrição Estadual ST</SelectItem>
                            <SelectItem value="im">Inscrição Municipal</SelectItem>
                            <SelectItem value="suframa">SUFRAMA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <Label>Documento</Label>
                        <div className="flex gap-2">
                          <Input placeholder="Selecione um arquivo" readOnly className="flex-1" />
                          <Button variant="outline" size="icon" className="flex-shrink-0">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center py-4 text-orange-600 font-medium">
                      NENHUM DOCUMENTO INFORMADO PARA ESTE CLIENTE ATÉ O MOMENTO!
                    </div>
                  </div>
                  
                  {/* Crédito */}
                  <div id="credito-content" className="mb-6 hidden">
                    <div className="bg-background rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">TOTAL VENCIDAS</div>
                          <div className="font-medium">R$ 0,00</div>
                        </div>
                        
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">TOTAL A VENCER</div>
                          <div className="font-medium">R$ 0,00</div>
                        </div>
                        
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">TOTAL PAGAS</div>
                          <div className="font-medium">R$ 0,00</div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="text-xs text-muted-foreground">PARCELAS DO CLIENTE</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-green-500 rounded-md mb-2"></div>
                          <div className="text-xs">VENCIDAS</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-gray-400 rounded-md mb-2"></div>
                          <div className="text-xs">A VENCER</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-gray-300 rounded-md mb-2"></div>
                          <div className="text-xs">PAGAS/RECEBIDAS</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">LIMITE DE CRÉDITO</div>
                          <div className="font-medium">R$ {(client.creditLimit || 0).toFixed(2)}</div>
                        </div>
                        
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">LIMITE UTILIZADO</div>
                          <div className="font-medium">R$ 0,00</div>
                        </div>
                        
                        <div className="text-center p-3 bg-muted rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">LIMITE DISPONÍVEL</div>
                          <div className="font-medium">R$ {(client.creditLimit || 0).toFixed(2)}</div>
                        </div>
                      </div>
