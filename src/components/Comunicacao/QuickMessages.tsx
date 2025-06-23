
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickMessagesProps {
  onSelectMessage: (message: string) => void;
}

const QuickMessages = ({ onSelectMessage }: QuickMessagesProps) => {
  const quickMessages = [
    {
      label: 'Saudação inicial',
      message: 'Obrigado pelo contato! Como posso ajudá-lo?'
    },
    {
      label: 'Verificar disponibilidade',
      message: 'Vou verificar a disponibilidade e retorno em breve.'
    },
    {
      label: 'Confirmar agendamento',
      message: 'Seu agendamento foi confirmado. Nos vemos em breve!'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Mensagens Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickMessages.map((item, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-left"
            onClick={() => onSelectMessage(item.message)}
          >
            {item.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickMessages;
