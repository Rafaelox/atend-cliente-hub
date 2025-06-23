
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, TestTube, Key, Server } from 'lucide-react';
import { toast } from 'sonner';

interface ApiConfigData {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
  webhookUrl: string;
  enableLogging: boolean;
  customHeaders: string;
}

const ApiConfig = () => {
  const [config, setConfig] = useState<ApiConfigData>({
    baseUrl: 'https://api.exemplo.com',
    apiKey: '',
    timeout: 30,
    retryAttempts: 3,
    webhookUrl: '',
    enableLogging: true,
    customHeaders: '{"Content-Type": "application/json"}'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular salvamento
    setTimeout(() => {
      toast.success('Configurações salvas com sucesso!');
      setIsSaving(false);
    }, 1000);
  };

  const handleTest = async () => {
    if (!config.baseUrl || !config.apiKey) {
      toast.error('URL base e chave da API são obrigatórias para testar');
      return;
    }

    setIsTesting(true);
    
    // Simular teste da API
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% de chance de sucesso
      if (success) {
        toast.success('Conexão com a API testada com sucesso!');
      } else {
        toast.error('Falha ao conectar com a API. Verifique as configurações.');
      }
      setIsTesting(false);
    }, 2000);
  };

  const updateConfig = (field: keyof ApiConfigData, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Configuração da API</span>
        </CardTitle>
        <CardDescription>
          Configure as credenciais e parâmetros da API que alimenta os dados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL Base da API *</Label>
            <div className="flex space-x-2">
              <Server className="h-4 w-4 mt-3 text-gray-400" />
              <Input
                id="baseUrl"
                value={config.baseUrl}
                onChange={(e) => updateConfig('baseUrl', e.target.value)}
                placeholder="https://api.exemplo.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave da API *</Label>
            <div className="flex space-x-2">
              <Key className="h-4 w-4 mt-3 text-gray-400" />
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey}
                onChange={(e) => updateConfig('apiKey', e.target.value)}
                placeholder="Sua chave da API"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout (segundos)</Label>
            <Input
              id="timeout"
              type="number"
              value={config.timeout}
              onChange={(e) => updateConfig('timeout', parseInt(e.target.value) || 30)}
              min="1"
              max="300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retryAttempts">Tentativas de Retry</Label>
            <Input
              id="retryAttempts"
              type="number"
              value={config.retryAttempts}
              onChange={(e) => updateConfig('retryAttempts', parseInt(e.target.value) || 3)}
              min="0"
              max="10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhookUrl">URL do Webhook (opcional)</Label>
          <Input
            id="webhookUrl"
            value={config.webhookUrl}
            onChange={(e) => updateConfig('webhookUrl', e.target.value)}
            placeholder="https://webhook.exemplo.com/notify"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customHeaders">Headers Customizados (JSON)</Label>
          <Textarea
            id="customHeaders"
            value={config.customHeaders}
            onChange={(e) => updateConfig('customHeaders', e.target.value)}
            placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableLogging"
            checked={config.enableLogging}
            onCheckedChange={(checked) => updateConfig('enableLogging', checked)}
          />
          <Label htmlFor="enableLogging">Habilitar logs de debug</Label>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
          <Button variant="outline" onClick={handleTest} disabled={isTesting}>
            <TestTube className="h-4 w-4 mr-2" />
            {isTesting ? 'Testando...' : 'Testar Conexão'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Dica:</strong> Após salvar as configurações, a API será utilizada para:
          </p>
          <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
            <li>Buscar dados dos clientes em tempo real</li>
            <li>Sincronizar mensagens do chat</li>
            <li>Enviar notificações via webhook</li>
            <li>Atualizar respostas automáticas do bot</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConfig;
