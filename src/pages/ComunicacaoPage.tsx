
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink, Clock, User2 } from 'lucide-react';
import { toast } from 'sonner';
import ChatMessage from '@/components/Communication/ChatMessage';
import ChatInput from '@/components/Communication/ChatInput';
import ClientInfo from '@/components/Communication/ClientInfo';
import QuickMessages from '@/components/Communication/QuickMessages';
import BotConfig from '@/components/Communication/BotConfig';

const ComunicacaoPage = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'cliente' as const,
      message: 'Olá, gostaria de saber sobre os horários disponíveis',
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'bot' as const,
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

    const message = {
      id: Date.now().toString(),
      sender: 'atendente' as const,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header moderno */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                <MessageCircle className="h-8 w-8" />
              </div>
              Comunicação com Cliente
            </h1>
            <p className="text-slate-600">Gerencie conversas e configure respostas automáticas</p>
          </div>
          <Button 
            onClick={openWhatsApp} 
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            size="lg"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Abrir WhatsApp
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Chat principal - ocupa mais espaço */}
          <div className="xl:col-span-3 space-y-6">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">{clienteAtual.nome}</CardTitle>
                      <CardDescription>Conversa ativa</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    Online agora
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-slate-50">
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

            <BotConfig />
          </div>

          {/* Sidebar direita */}
          <div className="space-y-6">
            <ClientInfo 
              cliente={clienteAtual}
              onOpenWhatsApp={openWhatsApp}
            />

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
