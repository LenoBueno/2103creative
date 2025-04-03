
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Email = () => {
  const { toast } = useToast();
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.exemplo.com',
    port: '587',
    username: 'sistema@exemplo.com',
    password: '******',
    encryption: 'tls',
    senderName: 'Sistema ERP',
    senderEmail: 'sistema@exemplo.com',
    enableSMTP: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    console.log('Salvando configurações de email:', emailSettings);
    toast({
      title: "Configurações salvas",
      description: "As configurações de email foram salvas com sucesso.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Teste de conexão",
      description: "Enviando email de teste...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Teste bem-sucedido",
        description: "Email de teste enviado com sucesso.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Configurações de Email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch 
              id="enable-smtp"
              checked={emailSettings.enableSMTP}
              onCheckedChange={(checked) => handleSwitchChange('enableSMTP', checked)}
            />
            <Label htmlFor="enable-smtp">Habilitar SMTP</Label>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">Servidor SMTP</Label>
                <Input
                  id="smtpServer"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Porta</Label>
                <Input
                  id="port"
                  name="port"
                  type="text"
                  value={emailSettings.port}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  name="username"
                  value={emailSettings.username}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={emailSettings.password}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="encryption">Criptografia</Label>
              <Select 
                value={emailSettings.encryption}
                onValueChange={(value) => handleSelectChange('encryption', value)}
                disabled={!emailSettings.enableSMTP}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de criptografia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">Nome do Remetente</Label>
                <Input
                  id="senderName"
                  name="senderName"
                  value={emailSettings.senderName}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderEmail">Email do Remetente</Label>
                <Input
                  id="senderEmail"
                  name="senderEmail"
                  value={emailSettings.senderEmail}
                  onChange={handleChange}
                  disabled={!emailSettings.enableSMTP}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={handleTestConnection}
              disabled={!emailSettings.enableSMTP}
              className="gap-1"
            >
              <Send size={16} />
              Testar Conexão
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={!emailSettings.enableSMTP}
              className="gap-1"
            >
              <Save size={16} />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Email;
