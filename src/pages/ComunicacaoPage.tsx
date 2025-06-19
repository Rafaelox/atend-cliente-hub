
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink, Clock, User2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ChatMessage from '@/components/Communication/ChatMessage';
import ChatInput from '@/components/Communication/ChatInput';
import ClientInfo from '@/components/Communication/ClientInfo';
import QuickMessages from '@/components/Communication/QuickMessages';
import BotConfig from '@/components/Communication/BotConfig';

interface ChatMessageType {
  id: string;
  sender: 'cliente' | 'bot' | 'atendente';
  message: string;
  timestamp: Date;
}

const ComunicacaoPage = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([
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

  const quickMessages = [
    'Obrigado pelo contato! Como posso ajudá-lo?',
    'Vou verificar a disponibilidade e retorno em breve.',
    'Seu agendamento foi confirmado. Nos vemos em breve!'
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessageType = {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-8">
        {/* Header moderno - adaptado para mobile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl text-white">
                <MessageCircle className="h-5 w-5 lg:h-8 lg:w-8" />
              </div>
              <span className="hidden sm:inline">Comunicação com Cliente</span>
              <span className="sm:hidden">Chat</span>
            </h1>
            <p className="text-sm lg:text-base text-slate-600 hidden sm:block">Gerencie conversas e configure respostas automáticas</p>
          </div>
          <Button 
            onClick={openWhatsApp} 
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg w-full sm:w-auto"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Abrir WhatsApp</span>
          </Button>
        </div>

        {/* Layout principal - mobile first */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Informações do cliente - primeira no mobile */}
          <div className="lg:hidden">
            <ClientInfo 
              cliente={clienteAtual}
              onOpenWhatsApp={openWhatsApp}
            />
          </div>

          {/* Chat principal */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            <Card className="shadow-lg lg:shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-3 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="p-1.5 lg:p-2 bg-blue-100 rounded-lg">
                      <User2 className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg lg:text-xl text-slate-900">{clienteAtual.nome}</CardTitle>
                      <CardDescription className="text-sm">Conversa ativa</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-500">
                    <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="hidden sm:inline">Online agora</span>
                    <span className="sm:hidden">Online</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] sm:h-[450px] lg:h-[500px] overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 bg-gradient-to-b from-white to-slate-50">
                  {chatMessages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      id={msg.id}
                      sender={msg.sender}
                      message={msg.message}
                      timestamp={msg.timestamp}
                      clientName={clienteAtual.nome}
                    />
                  ))}
                </div>
                
                <ChatInput
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  onSendMessage={handleSendMessage}
                />
              </CardContent>
            </Card>

            {/* BotConfig - escondido no mobile, visível no desktop */}
            <div className="hidden lg:block">
              <BotConfig />
            </div>
          </div>

          {/* Sidebar direita - oculta no mobile */}
          <div className="hidden lg:block space-y-6">
            <ClientInfo 
              cliente={clienteAtual}
              onOpenWhatsApp={openWhatsApp}
            />

            <QuickMessages 
              messages={quickMessages}
              onSelectMessage={setNewMessage}
            />
          </div>

          {/* Quick Messages - visível no mobile na parte inferior */}
          <div className="lg:hidden">
            <QuickMessages 
              messages={quickMessages}
              onSelectMessage={setNewMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComunicacaoPage;
