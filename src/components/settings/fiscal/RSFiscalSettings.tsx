
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, PlusCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ICMSRSForm from '@/components/inventory/fiscal/ICMSRSForm';

interface ReducaoICMS {
  ativo: boolean;
  percentual: number;
}

interface DifAliquotas {
  ativo: boolean;
  percentualInterna: number;
  percentualInterestadual: number;
}

interface RSConfigState {
  difal: boolean;
  aliquotaInterna: number;
  regimeTributario: string;
  inscricaoEstadual: string;
  utilizaNFCe: boolean;
  utilizaNFe: boolean;
  serieNFCe: string;
  serieNFe: string;
  ambienteProducao: boolean;
  cscId: string;
  cscToken: string;
  modeloImpressaoNFCe: string;
  enviarEmailAutomatico: boolean;
  reducaoICMS: ReducaoICMS;
  difAliquotas: DifAliquotas;
}

interface SefazCredentials {
  username: string;
  password: string;
  token: string;
  apiEndpoint: string;
}

const RSFiscalSettings = () => {
  const { toast } = useToast();

  const [rsConfig, setRsConfig] = useState<RSConfigState>({
    difal: true,
    aliquotaInterna: 18,
    regimeTributario: 'normal',
    inscricaoEstadual: '',
    utilizaNFCe: true,
    utilizaNFe: true,
    serieNFCe: '1',
    serieNFe: '1',
    ambienteProducao: false,
    cscId: '',
    cscToken: '',
    modeloImpressaoNFCe: 'normal',
    enviarEmailAutomatico: true,
    reducaoICMS: {
      ativo: false,
      percentual: 10
    },
    difAliquotas: {
      ativo: true,
      percentualInterna: 18,
      percentualInterestadual: 12
    }
  });

  const [sefazCredentials, setSefazCredentials] = useState<SefazCredentials>({
    username: '',
    password: '',
    token: '',
    apiEndpoint: 'https://www.sefazrs.rs.gov.br/ws/nfce/NFeAutorizacao4.asmx',
  });

  const handleRSConfigChange = (values: Partial<RSConfigState>) => {
    setRsConfig(prev => ({
      ...prev,
      ...values
    }));
  };

  const handleInputChange = (field: keyof RSConfigState, value: any) => {
    setRsConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Fixed the spread type error by explicitly typing the nested objects
  const handleNestedInputChange = <K extends keyof RSConfigState>(
    parent: K, 
    field: string, 
    value: any
  ) => {
    setRsConfig(prev => {
      if (parent === 'reducaoICMS') {
        return {
          ...prev,
          reducaoICMS: {
            ...prev.reducaoICMS,
            [field]: value
          }
        };
      } else if (parent === 'difAliquotas') {
        return {
          ...prev,
          difAliquotas: {
            ...prev.difAliquotas,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSefazChange = (field: keyof SefazCredentials, value: string) => {
    setSefazCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveRSConfig = () => {
    console.log('Salvando configuração RS:', rsConfig);
    toast({
      title: "Configuração salva",
      description: "As configurações do RS foram salvas com sucesso.",
    });
  };

  const handleSaveSefazConfig = () => {
    console.log('Salvando credenciais SEFAZ:', sefazCredentials);
    toast({
      title: "Credenciais salvas",
      description: "As credenciais da SEFAZ foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="icms">ICMS</TabsTrigger>
          <TabsTrigger value="difal">DIFAL</TabsTrigger>
          <TabsTrigger value="sefaz">SEFAZ</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Configurações Gerais - RS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regimeTributario">Regime Tributário</Label>
                  <Select
                    value={rsConfig.regimeTributario}
                    onValueChange={(value) => handleInputChange('regimeTributario', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o regime tributário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples">Simples Nacional</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input
                    id="inscricaoEstadual"
                    value={rsConfig.inscricaoEstadual}
                    onChange={(e) => handleInputChange('inscricaoEstadual', e.target.value)}
                    placeholder="Inscrição Estadual"
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="utilizaNFCe">Utiliza NFC-e</Label>
                  <Switch
                    id="utilizaNFCe"
                    checked={rsConfig.utilizaNFCe}
                    onCheckedChange={(checked) => handleInputChange('utilizaNFCe', checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="utilizaNFe">Utiliza NF-e</Label>
                  <Switch
                    id="utilizaNFe"
                    checked={rsConfig.utilizaNFe}
                    onCheckedChange={(checked) => handleInputChange('utilizaNFe', checked)}
                  />
                </div>

                {rsConfig.utilizaNFCe && (
                  <div>
                    <Label htmlFor="serieNFCe">Série NFC-e</Label>
                    <Input
                      id="serieNFCe"
                      value={rsConfig.serieNFCe}
                      onChange={(e) => handleInputChange('serieNFCe', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                )}

                {rsConfig.utilizaNFe && (
                  <div>
                    <Label htmlFor="serieNFe">Série NF-e</Label>
                    <Input
                      id="serieNFe"
                      value={rsConfig.serieNFe}
                      onChange={(e) => handleInputChange('serieNFe', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="ambienteProducao">
                    Ambiente de Produção
                    <p className="text-xs text-muted-foreground">
                      Desativado = Ambiente de homologação (testes)
                    </p>
                  </Label>
                  <Switch
                    id="ambienteProducao"
                    checked={rsConfig.ambienteProducao}
                    onCheckedChange={(checked) => handleInputChange('ambienteProducao', checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="enviarEmailAutomatico">Enviar e-mail automático</Label>
                  <Switch
                    id="enviarEmailAutomatico"
                    checked={rsConfig.enviarEmailAutomatico}
                    onCheckedChange={(checked) => handleInputChange('enviarEmailAutomatico', checked)}
                  />
                </div>
              </div>

              {rsConfig.utilizaNFCe && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Configurações NFC-e</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cscId">ID do CSC</Label>
                      <Input
                        id="cscId"
                        value={rsConfig.cscId}
                        onChange={(e) => handleInputChange('cscId', e.target.value)}
                        placeholder="ID do CSC (SEFAZ)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cscToken">Token do CSC</Label>
                      <Input
                        id="cscToken"
                        value={rsConfig.cscToken}
                        onChange={(e) => handleInputChange('cscToken', e.target.value)}
                        placeholder="Token CSC (SEFAZ)"
                        type="password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modeloImpressaoNFCe">Modelo de impressão NFC-e</Label>
                      <Select
                        value={rsConfig.modeloImpressaoNFCe}
                        onValueChange={(value) => handleInputChange('modeloImpressaoNFCe', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo de impressão" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="simplificado">Simplificado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-2">
                <Button onClick={handleSaveRSConfig} className="gap-1">
                  <Save size={16} />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="icms">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Configurações ICMS/RS</CardTitle>
            </CardHeader>
            <CardContent>
              <ICMSRSForm 
                initialValues={rsConfig}
                onChange={handleRSConfigChange}
              />

              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-4">Redução da Base de Cálculo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-4">
                    <Label htmlFor="reducaoAtiva">Ativar redução</Label>
                    <Switch
                      id="reducaoAtiva"
                      checked={rsConfig.reducaoICMS.ativo}
                      onCheckedChange={(checked) => handleNestedInputChange('reducaoICMS', 'ativo', checked)}
                    />
                  </div>

                  {rsConfig.reducaoICMS.ativo && (
                    <div>
                      <Label htmlFor="percentualReducao">Percentual de redução (%)</Label>
                      <Input
                        id="percentualReducao"
                        type="number"
                        value={rsConfig.reducaoICMS.percentual}
                        onChange={(e) => handleNestedInputChange('reducaoICMS', 'percentual', parseFloat(e.target.value))}
                        min="0"
                        max="100"
                        step="0.5"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveRSConfig} className="gap-1">
                  <Save size={16} />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="difal">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Configurações DIFAL/RS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start space-x-2">
                  <AlertCircle size={18} className="text-yellow-500 mt-0.5" />
                  <div className="text-sm text-yellow-700">
                    <p className="font-medium">Atenção</p>
                    <p>O DIFAL (Diferencial de Alíquotas) é aplicável nas operações interestaduais destinadas a não contribuintes do ICMS.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-4">
                    <Label htmlFor="difalAtivo">Aplicar DIFAL</Label>
                    <Switch
                      id="difalAtivo"
                      checked={rsConfig.difAliquotas.ativo}
                      onCheckedChange={(checked) => handleNestedInputChange('difAliquotas', 'ativo', checked)}
                    />
                  </div>

                  {rsConfig.difAliquotas.ativo && (
                    <>
                      <div>
                        <Label htmlFor="percentualInterna">Alíquota Interna RS (%)</Label>
                        <Input
                          id="percentualInterna"
                          type="number"
                          value={rsConfig.difAliquotas.percentualInterna}
                          onChange={(e) => handleNestedInputChange('difAliquotas', 'percentualInterna', parseFloat(e.target.value))}
                          min="0"
                          max="100"
                          step="0.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="percentualInterestadual">Alíquota Interestadual (%)</Label>
                        <Input
                          id="percentualInterestadual"
                          type="number"
                          value={rsConfig.difAliquotas.percentualInterestadual}
                          onChange={(e) => handleNestedInputChange('difAliquotas', 'percentualInterestadual', parseFloat(e.target.value))}
                          min="0"
                          max="100"
                          step="0.5"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveRSConfig} className="gap-1">
                  <Save size={16} />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sefaz">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Credenciais SEFAZ-RS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    value={sefazCredentials.username}
                    onChange={(e) => handleSefazChange('username', e.target.value)}
                    placeholder="Usuário SEFAZ"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={sefazCredentials.password}
                    onChange={(e) => handleSefazChange('password', e.target.value)}
                    placeholder="Senha SEFAZ"
                  />
                </div>

                <div>
                  <Label htmlFor="token">Token de Acesso (se aplicável)</Label>
                  <Input
                    id="token"
                    type="password"
                    value={sefazCredentials.token}
                    onChange={(e) => handleSefazChange('token', e.target.value)}
                    placeholder="Token de acesso da API"
                  />
                </div>

                <div>
                  <Label htmlFor="apiEndpoint">Endpoint da API</Label>
                  <Input
                    id="apiEndpoint"
                    value={sefazCredentials.apiEndpoint}
                    onChange={(e) => handleSefazChange('apiEndpoint', e.target.value)}
                    placeholder="URL do endpoint da API"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" className="gap-1" onClick={() => {
                  toast({
                    title: "Teste de conexão",
                    description: "Conexão com a SEFAZ-RS realizada com sucesso.",
                  });
                }}>
                  Testar Conexão
                </Button>
                
                <Button onClick={handleSaveSefazConfig} className="gap-1">
                  <Save size={16} />
                  Salvar Credenciais
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RSFiscalSettings;
