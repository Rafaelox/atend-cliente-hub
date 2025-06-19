
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickMessagesProps {
  messages: string[];
  onSelectMessage: (message: string) => void;
}

const QuickMessages = ({ messages, onSelectMessage }: QuickMessagesProps) => {
  return (
    <Card className="shadow-lg lg:shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b p-3 lg:p-6">
        <CardTitle className="text-slate-900 text-base lg:text-lg">Mensagens Rápidas</CardTitle>
        <CardDescription className="text-sm lg:text-base">Clique para usar uma resposta pré-definida</CardDescription>
      </CardHeader>
      <CardContent className="p-3 lg:p-6 space-y-2 lg:space-y-3">
        {messages.map((msg, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-left h-auto p-2 lg:p-3 hover:bg-amber-50 hover:border-amber-300 transition-colors"
            onClick={() => onSelectMessage(msg)}
          >
            <span className="text-xs lg:text-sm leading-relaxed">{msg}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickMessages;
