
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bot, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BotConfig = () => {
  const isMobile = useIsMobile();
  
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
    <Card className="shadow-sm">
      <CardHeader className={isMobile ? 'pb-3' : ''}>
        <CardTitle className={`flex items-center space-x-2 ${isMobile ? 'text-lg' : ''}`}>
          <Bot className="h-5 w-5" />
          <span>Configuração do Bot</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? 'px-3' : ''}`}>
        <div className="space-y-2">
          <Label className={`${isMobile ? 'text-sm' : ''}`}>Respostas Automáticas</Label>
          <div className="space-y-2">
            {autoResponses.map((item, index) => (
              <div key={index} className={`p-3 border rounded-lg bg-gray-50 ${isMobile ? 'space-y-1' : ''}`}>
                <p className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
                  Palavra-chave: "{item.keyword}"
                </p>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                  Resposta: "{item.response}"
                </p>
              </div>
            ))}
          </div>
        </div>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "sm"}
          className={`${isMobile ? 'w-full py-3' : ''}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Adicionar Nova Resposta</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BotConfig;
