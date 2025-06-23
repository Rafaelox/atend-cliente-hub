
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bot, Plus } from 'lucide-react';

const BotConfig = () => {
  const autoResponses = [
    {
      keyword: 'horário',
      response: 'Nossos horários de atendimento são de segunda a sexta, das 8h às 18h.'
    },
    {
      keyword: 'valor',
      response: 'Os valores variam conforme o tipo de consulta. Entre em contato para mais informações.'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Configuração do Bot</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Respostas Automáticas</Label>
          <div className="space-y-2">
            {autoResponses.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-medium text-sm">Palavra-chave: "{item.keyword}"</p>
                <p className="text-sm text-gray-600">Resposta: "{item.response}"</p>
              </div>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nova Resposta
        </Button>
      </CardContent>
    </Card>
  );
};

export default BotConfig;
