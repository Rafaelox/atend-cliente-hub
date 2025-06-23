
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuickMessagesProps {
  onSelectMessage: (message: string) => void;
}

const QuickMessages = ({ onSelectMessage }: QuickMessagesProps) => {
  const isMobile = useIsMobile();
  
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
    <Card className="shadow-sm">
      <CardHeader className={isMobile ? 'pb-3' : ''}>
        <CardTitle className={`flex items-center space-x-2 ${isMobile ? 'text-lg' : 'text-sm'}`}>
          <MessageSquare className="h-4 w-4" />
          <span>Mensagens Rápidas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-2 ${isMobile ? 'px-3' : ''}`}>
        {quickMessages.map((item, index) => (
          <Button 
            key={index}
            variant="outline" 
            size={isMobile ? "sm" : "sm"}
            className={`w-full justify-start text-left ${isMobile ? 'h-auto py-3 px-3' : ''}`}
            onClick={() => onSelectMessage(item.message)}
          >
            <span className={`${isMobile ? 'text-sm' : ''} truncate`}>
              {item.label}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickMessages;
