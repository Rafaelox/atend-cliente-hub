
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ExternalLink } from 'lucide-react';

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
    switch (sender) {
      case 'cliente':
        return 'bg-gray-100 text-gray-900 ml-0 mr-12';
      case 'bot':
        return 'bg-blue-100 text-blue-900 ml-0 mr-12';
      case 'atendente':
        return 'bg-green-100 text-green-900 ml-12 mr-0';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Chat - {clientName}</span>
          <Button onClick={onOpenWhatsApp} size="sm" className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>Abrir WhatsApp</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg ${getSenderStyle(msg.sender)}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">
                  {getSenderName(msg.sender)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <Button onClick={onSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
