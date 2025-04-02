
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ICMSRSForm from '@/components/inventory/fiscal/ICMSRSForm';

const FiscalConfig = () => {
  const { toast } = useToast();

  const [certData, setCertData] = useState({
    certificadoNome: '',
    certificadoSenha: '',
    certificadoValidade: '',
    file: null as File | null,
  });

  const [rsConfig, setRsConfig] = useState({
    difal: true,
    aliquotaInterna: 18,
  });
  
  const handleCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === 'certificadoFile' && files && files.length > 0) {
      setCertData(prev => ({ ...prev, file: files[0] }));
    } else {
      setCertData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRSConfigChange = (values: any) => {
    setRsConfig(values);
  };

  const handleSaveCertificado = () => {
    // Aqui implementaria a lógica de salvar o certificado
    console.log('Salvando certificado:', certData);
    toast({
      title: "Certificado salvo",
      description: "O certificado digital foi salvo com sucesso.",
    });
  };

  const handleSaveRSConfig = () => {
    // Aqui implementaria a lógica de salvar a configuração RS
    console.log('Salvando configuração RS:', rsConfig);
    toast({
      title: "Configuração salva",
      description: "As configurações do RS foram salvas com sucesso.",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Configurações Fiscais"
          description="Gerenciamento de configurações fiscais e tributárias"
        />
        
        <Tabs defaultValue="certificado" className="space-y-4">
          <TabsList>
            <TabsTrigger value="certificado">Certificado Digital</TabsTrigger>
            <TabsTrigger value="rs">Configurações RS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="certificado" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <FileText size={18} className="mr-2" />
                  Certificado Digital A1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="certificadoNome">Nome do Certificado</Label>
                      <Input
                        id="certificadoNome"
                        name="certificadoNome"
                        value={certData.certificadoNome}
                        onChange={handleCertChange}
                        placeholder="Nome do Certificado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certificadoValidade">Validade</Label>
                      <Input
                        id="certificadoValidade"
                        name="certificadoValidade"
                        type="date"
                        value={certData.certificadoValidade}
                        onChange={handleCertChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="certificadoSenha">Senha do Certificado</Label>
                      <Input
                        id="certificadoSenha"
                        name="certificadoSenha"
                        type="password"
                        value={certData.certificadoSenha}
                        onChange={handleCertChange}
                        placeholder="Senha do Certificado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certificadoFile">Arquivo do Certificado (.pfx)</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="certificadoFile"
                          name="certificadoFile"
                          type="file"
                          accept=".pfx,.p12"
                          onChange={handleCertChange}
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload size={16} />
                        </Button>
                      </div>
                      {certData.file && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Arquivo selecionado: {certData.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveCertificado} className="gap-1">
                      <Save size={16} />
                      Salvar Certificado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Configurações ICMS/RS</CardTitle>
              </CardHeader>
              <CardContent>
                <ICMSRSForm 
                  initialValues={rsConfig}
                  onChange={handleRSConfigChange}
                />
                
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSaveRSConfig} className="gap-1">
                    <Save size={16} />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FiscalConfig;
