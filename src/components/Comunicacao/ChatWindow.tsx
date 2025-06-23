
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  onOpenWhatsApp: () => void;
  clientName: string;
}

const ChatWindow = ({ 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  onOpenWhatsApp, 
  clientName 
}: ChatWindowProps) => {
  const isMobile = useIsMobile();
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'cliente':
        return clientName;
      case 'bot':
        return 'Assistente Virtual';
      case 'atendente':
        return 'Você';
      default:
        return sender;
    }
  };

  const getSenderStyle = (sender: string) => {
    const baseStyle = isMobile ? 'text-sm' : '';
    switch (sender) {
      case 'cliente':
        return `bg-gray-100 text-gray-900 ml-0 ${isMobile ? 'mr-8' : 'mr-12'} ${baseStyle}`;
      case 'bot':
        return `bg-blue-100 text-blue-900 ml-0 ${isMobile ? 'mr-8' : 'mr-12'} ${baseStyle}`;
      case 'atendente':
        return `bg-green-100 text-green-900 ${isMobile ? 'ml-8' : 'ml-12'} mr-0 ${baseStyle}`;
      default:
        return `bg-gray-100 text-gray-900 ${baseStyle}`;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className={`${isMobile ? 'pb-3' : ''}`}>
        <CardTitle className={`flex items-center justify-between ${isMobile ? 'text-lg' : ''}`}>
          <span className="truncate">
            {isMobile ? clientName.split(' ')[0] : `Chat - ${clientName}`}
          </span>
          <Button 
            onClick={onOpenWhatsApp} 
            size={isMobile ? "sm" : "default"}
            className={`flex items-center space-x-2 ${isMobile ? 'px-3' : ''}`}
          >
            <ExternalLink className="h-4 w-4" />
            <span className={isMobile ? 'hidden sm:inline' : ''}>WhatsApp</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? 'px-3' : ''}>
        <div className={`${isMobile ? 'h-80' : 'h-96'} overflow-y-auto border rounded-lg p-3 space-y-3 bg-gray-50`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg ${getSenderStyle(msg.sender)}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {getSenderName(msg.sender)}
                </span>
                <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500`}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <p className={`${isMobile ? 'text-sm' : 'text-sm'} leading-relaxed`}>{msg.message}</p>
            </div>
          ))}
        </div>
        
        <div className={`${isMobile ? 'mt-3' : 'mt-4'} flex space-x-2`}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className={isMobile ? 'text-sm' : ''}
          />
          <Button onClick={onSendMessage} size={isMobile ? "sm" : "default"}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
