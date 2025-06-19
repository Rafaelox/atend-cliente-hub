
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bot, Plus } from 'lucide-react';

const BotConfig = () => {
  const autoResponses = [
    {
      keyword: "horário",
      response: "Nossos horários de atendimento são de segunda a sexta, das 8h às 18h."
    },
    {
      keyword: "valor",
      response: "Os valores variam conforme o tipo de consulta. Entre em contato para mais informações."
    }
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
        <CardTitle className="flex items-center gap-3 text-slate-900">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Bot className="h-5 w-5 text-purple-600" />
          </div>
          Configuração do Bot
        </CardTitle>
        <CardDescription>Configure respostas automáticas inteligentes</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label className="text-base font-semibold text-slate-700 mb-4 block">Respostas Automáticas</Label>
          <div className="space-y-4">
            {autoResponses.map((item, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 hover:shadow-md transition-shadow">
                <p className="font-medium text-sm text-slate-700 mb-1">🕐 Palavra-chave: "{item.keyword}"</p>
                <p className="text-sm text-slate-600">Resposta: "{item.response}"</p>
              </div>
            ))}
          </div>
        </div>
        <Button variant="outline" className="w-full border-dashed border-2 hover:bg-purple-50 hover:border-purple-300">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nova Resposta
        </Button>
      </CardContent>
    </Card>
  );
};

export default BotConfig;
