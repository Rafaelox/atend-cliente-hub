
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import ApiConfig from '@/components/Comunicacao/ApiConfig';
import ChatWindow from '@/components/Comunicacao/ChatWindow';
import ClientInfo from '@/components/Comunicacao/ClientInfo';
import QuickMessages from '@/components/Comunicacao/QuickMessages';
import BotConfig from '@/components/Comunicacao/BotConfig';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

const ComunicacaoPage = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'cliente',
      message: 'Olá, gostaria de saber sobre os horários disponíveis',
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'bot',
      message: 'Olá! Temos horários disponíveis para esta semana. Que tipo de consulta você precisa?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const clienteAtual = {
    nome: 'Maria Silva Santos',
    telefone: '11999999999',
    email: 'maria.silva@email.com'
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'atendente',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
    toast.success('Mensagem enviada!');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Entrando em contato pelo sistema de atendimento.');
    const url = `https://wa.me/55${clienteAtual.telefone}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <span>Comunicação com Cliente</span>
        </h1>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat & Mensagens</TabsTrigger>
          <TabsTrigger value="config">Configurações da API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <ChatWindow
                messages={chatMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSendMessage={handleSendMessage}
                onOpenWhatsApp={openWhatsApp}
                clientName={clienteAtual.nome}
              />
              <BotConfig />
            </div>

            <div className="space-y-4">
              <ClientInfo 
                cliente={clienteAtual} 
                onOpenWhatsApp={openWhatsApp} 
              />
              <QuickMessages onSelectMessage={setNewMessage} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="config" className="space-y-6">
          <ApiConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComunicacaoPage;
