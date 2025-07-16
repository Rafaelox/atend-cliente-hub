import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Settings, Check, X, Eye, EyeOff, TestTube } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

const ApiConfig = () => {
  const [config, setConfig] = useState({
    baseUrl: '',
    apiKey: ''
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    // Verificar se já existe configuração
    const baseUrl = localStorage.getItem('agenda_oxum_apiBaseUrl') || '';
    const apiKey = localStorage.getItem('agenda_oxum_apiKey') || '';
    
    setConfig({ baseUrl, apiKey });
    setIsConfigured(!!(baseUrl && apiKey));
  }, []);

  const handleSave = () => {
    if (!config.baseUrl || !config.apiKey) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    try {
      apiClient.setConfig(config.baseUrl, config.apiKey);
      setIsConfigured(true);
      toast.success('Configuração da API salva com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configuração');
    }
  };

  const handleClear = () => {
    apiClient.clearConfig();
    setConfig({ baseUrl: '', apiKey: '' });
    setIsConfigured(false);
    setTestResult(null);
    toast.info('Configuração removida');
  };

  const handleTest = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // Tentar fazer uma requisição de teste
      await apiClient.get('/health'); // Endpoint de health check
      setTestResult({ success: true, message: 'Conexão estabelecida com sucesso!' });
      toast.success('API funcionando corretamente!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      setTestResult({ success: false, message });
      toast.error('Falha na conexão com a API');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuração da API</h2>
          <p className="text-gray-600">Configure a conexão com sua API externa</p>
        </div>
        <Badge variant={isConfigured ? "default" : "secondary"} className="flex items-center gap-1">
          {isConfigured ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          {isConfigured ? 'Configurada' : 'Não Configurada'}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Credenciais da API
          </CardTitle>
          <CardDescription>
            Configure as informações de acesso à sua API. Os dados são armazenados localmente no navegador.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL Base da API</Label>
            <Input
              id="baseUrl"
              type="url"
              placeholder="https://api.exemplo.com"
              value={config.baseUrl}
              onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave da API</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                placeholder="sua-chave-da-api"
                value={config.apiKey}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!config.baseUrl || !config.apiKey}>
              Salvar Configuração
            </Button>
            {isConfigured && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleTest} 
                  disabled={isTesting}
                  className="flex items-center gap-2"
                >
                  <TestTube className="h-4 w-4" />
                  {isTesting ? 'Testando...' : 'Testar Conexão'}
                </Button>
                <Button variant="destructive" onClick={handleClear}>
                  Limpar
                </Button>
              </>
            )}
          </div>

          {testResult && (
            <Alert className={testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Informações sobre como os dados são protegidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5" />
              <span>Credenciais armazenadas localmente no navegador</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5" />
              <span>Dados não são enviados para servidores externos</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5" />
              <span>Comunicação direta com sua API</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 mt-0.5" />
              <span>Headers de autenticação seguros</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiConfig;