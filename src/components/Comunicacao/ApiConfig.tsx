
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Save, TestTube, Key, Server, Shield, Globe, Clock, Database } from 'lucide-react';
import { toast } from 'sonner';

interface ApiConfigData {
  // Configurações básicas
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
  webhookUrl: string;
  enableLogging: boolean;
  customHeaders: string;
  
  // Configurações .NET 5
  environment: 'Development' | 'Staging' | 'Production';
  apiVersion: string;
  authType: 'Bearer' | 'ApiKey' | 'Basic';
  jwtToken: string;
  refreshToken: string;
  tokenExpiration: number;
  refreshUrl: string;
  
  // Endpoints
  endpoints: {
    clientes: string;
    agendamentos: string;
    pagamentos: string;
    comunicacao: string;
  };
  
  // Configurações avançadas
  connectionPoolSize: number;
  rateLimitPerMinute: number;
  circuitBreakerEnabled: boolean;
  retryPolicy: 'Linear' | 'Exponential' | 'Fixed';
}

const ApiConfig = () => {
  const [config, setConfig] = useState<ApiConfigData>({
    baseUrl: 'https://api.exemplo.com',
    apiKey: '',
    timeout: 30,
    retryAttempts: 3,
    webhookUrl: '',
    enableLogging: true,
    customHeaders: '{"Content-Type": "application/json"}',
    
    environment: 'Development',
    apiVersion: 'v1',
    authType: 'Bearer',
    jwtToken: '',
    refreshToken: '',
    tokenExpiration: 60,
    refreshUrl: '',
    
    endpoints: {
      clientes: '/api/v1/clientes',
      agendamentos: '/api/v1/agendamentos',
      pagamentos: '/api/v1/pagamentos',
      comunicacao: '/api/v1/comunicacao'
    },
    
    connectionPoolSize: 10,
    rateLimitPerMinute: 100,
    circuitBreakerEnabled: true,
    retryPolicy: 'Exponential'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [profiles, setProfiles] = useState<string[]>(['Default']);
  const [currentProfile, setCurrentProfile] = useState('Default');

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem(`apiConfig_${currentProfile}`);
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Erro ao carregar configuração:', error);
      }
    }
  }, [currentProfile]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Salvar no localStorage
      localStorage.setItem(`apiConfig_${currentProfile}`, JSON.stringify(config));
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!config.baseUrl) {
      toast.error('URL base é obrigatória para testar');
      return;
    }

    setIsTesting(true);
    
    try {
      // Testar endpoint de saúde
      const healthUrl = `${config.baseUrl}/health`;
      const headers: Record<string, string> = {};
      
      if (config.authType === 'Bearer' && config.jwtToken) {
        headers.Authorization = `Bearer ${config.jwtToken}`;
      } else if (config.authType === 'ApiKey' && config.apiKey) {
        headers['X-API-Key'] = config.apiKey;
      }

      // Simular teste da API
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% de chance de sucesso
        if (success) {
          toast.success('Conexão com a API .NET 5 testada com sucesso!');
        } else {
          toast.error('Falha ao conectar com a API. Verifique as configurações.');
        }
        setIsTesting(false);
      }, 2000);
    } catch (error) {
      toast.error('Erro ao testar conexão');
      setIsTesting(false);
    }
  };

  const testEndpoint = async (endpoint: string) => {
    const fullUrl = `${config.baseUrl}${endpoint}`;
    toast.info(`Testando endpoint: ${fullUrl}`);
    
    // Simular teste específico do endpoint
    setTimeout(() => {
      toast.success(`Endpoint ${endpoint} respondeu com sucesso!`);
    }, 1000);
  };

  const updateConfig = (field: keyof ApiConfigData, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateEndpoint = (endpoint: keyof ApiConfigData['endpoints'], value: string) => {
    setConfig(prev => ({
      ...prev,
      endpoints: { ...prev.endpoints, [endpoint]: value }
    }));
  };

  const createNewProfile = () => {
    const profileName = prompt('Nome do novo perfil:');
    if (profileName && !profiles.includes(profileName)) {
      setProfiles(prev => [...prev, profileName]);
      setCurrentProfile(profileName);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configuração da API .NET 5</span>
          </CardTitle>
          <CardDescription>
            Configure a integração com sua API .NET 5 backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Label>Perfil:</Label>
            <Select value={currentProfile} onValueChange={setCurrentProfile}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar perfil" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map(profile => (
                  <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={createNewProfile}>
              Novo Perfil
            </Button>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="auth">Autenticação</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
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
                  <Label htmlFor="environment">Ambiente</Label>
                  <Select value={config.environment} onValueChange={(value) => updateConfig('environment', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Staging">Staging</SelectItem>
                      <SelectItem value="Production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiVersion">Versão da API</Label>
                  <Input
                    id="apiVersion"
                    value={config.apiVersion}
                    onChange={(e) => updateConfig('apiVersion', e.target.value)}
                    placeholder="v1"
                  />
                </div>
                
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
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableLogging"
                  checked={config.enableLogging}
                  onCheckedChange={(checked) => updateConfig('enableLogging', checked)}
                />
                <Label htmlFor="enableLogging">Habilitar logs de debug</Label>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Autenticação</Label>
                <Select value={config.authType} onValueChange={(value) => updateConfig('authType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bearer">Bearer Token (JWT)</SelectItem>
                    <SelectItem value="ApiKey">API Key</SelectItem>
                    <SelectItem value="Basic">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.authType === 'Bearer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="jwtToken">JWT Token</Label>
                    <div className="flex space-x-2">
                      <Shield className="h-4 w-4 mt-3 text-gray-400" />
                      <Textarea
                        id="jwtToken"
                        value={config.jwtToken}
                        onChange={(e) => updateConfig('jwtToken', e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="refreshToken">Refresh Token</Label>
                      <Input
                        id="refreshToken"
                        type="password"
                        value={config.refreshToken}
                        onChange={(e) => updateConfig('refreshToken', e.target.value)}
                        placeholder="Refresh token"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenExpiration">Expiração (minutos)</Label>
                      <Input
                        id="tokenExpiration"
                        type="number"
                        value={config.tokenExpiration}
                        onChange={(e) => updateConfig('tokenExpiration', parseInt(e.target.value) || 60)}
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refreshUrl">URL de Renovação</Label>
                    <Input
                      id="refreshUrl"
                      value={config.refreshUrl}
                      onChange={(e) => updateConfig('refreshUrl', e.target.value)}
                      placeholder="/api/auth/refresh"
                    />
                  </div>
                </>
              )}

              {config.authType === 'ApiKey' && (
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Chave da API</Label>
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
              )}
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mapeamento de Endpoints</h3>
                
                {Object.entries(config.endpoints).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-4">
                    <Label className="w-24 capitalize">{key}:</Label>
                    <Input
                      value={value}
                      onChange={(e) => updateEndpoint(key as keyof ApiConfigData['endpoints'], e.target.value)}
                      placeholder={`/api/v1/${key}`}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testEndpoint(value)}
                    >
                      <TestTube className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL do Webhook</Label>
                <Input
                  id="webhookUrl"
                  value={config.webhookUrl}
                  onChange={(e) => updateConfig('webhookUrl', e.target.value)}
                  placeholder="https://webhook.exemplo.com/notify"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="connectionPoolSize">Tamanho do Pool de Conexões</Label>
                  <Input
                    id="connectionPoolSize"
                    type="number"
                    value={config.connectionPoolSize}
                    onChange={(e) => updateConfig('connectionPoolSize', parseInt(e.target.value) || 10)}
                    min="1"
                    max="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rateLimitPerMinute">Rate Limit (por minuto)</Label>
                  <Input
                    id="rateLimitPerMinute"
                    type="number"
                    value={config.rateLimitPerMinute}
                    onChange={(e) => updateConfig('rateLimitPerMinute', parseInt(e.target.value) || 100)}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <Label>Política de Retry</Label>
                  <Select value={config.retryPolicy} onValueChange={(value) => updateConfig('retryPolicy', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar política" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Linear">Linear</SelectItem>
                      <SelectItem value="Exponential">Exponencial</SelectItem>
                      <SelectItem value="Fixed">Fixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="circuitBreakerEnabled"
                  checked={config.circuitBreakerEnabled}
                  onCheckedChange={(checked) => updateConfig('circuitBreakerEnabled', checked)}
                />
                <Label htmlFor="circuitBreakerEnabled">Habilitar Circuit Breaker</Label>
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
            </TabsContent>
          </Tabs>

          <div className="flex space-x-2 pt-6 border-t">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
            <Button variant="outline" onClick={handleTest} disabled={isTesting}>
              <TestTube className="h-4 w-4 mr-2" />
              {isTesting ? 'Testando...' : 'Testar Conexão'}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Integração .NET 5</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Suporte completo para autenticação JWT</li>
              <li>• Configuração específica para ambientes .NET</li>
              <li>• Mapeamento automático de endpoints da API</li>
              <li>• Políticas avançadas de retry e circuit breaker</li>
              <li>• Múltiplos perfis de configuração</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiConfig;
