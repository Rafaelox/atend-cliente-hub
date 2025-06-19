
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Bot, ExternalLink, Phone, Plus, Clock, User2 } from 'lucide-react';
import { toast } from 'sonner';

const ComunicacaoPage = () => {
  const [chatMessages, setChatMessages] = useState([
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

    const message = {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'cliente':
        return clienteAtual.nome;
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
        return 'bg-slate-100 text-slate-900 border-l-4 border-l-blue-500';
      case 'bot':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 border-l-4 border-l-blue-400';
      case 'atendente':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-900 border-l-4 border-l-green-500 ml-8';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const quickMessages = [
    'Obrigado pelo contato! Como posso ajudá-lo?',
    'Vou verificar a disponibilidade e retorno em breve.',
    'Seu agendamento foi confirmado. Nos vemos em breve!'
  ];

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
                    <div key={msg.id} className={`p-4 rounded-xl shadow-sm ${getSenderStyle(msg.sender)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">
                          {getSenderName(msg.sender)}
                        </span>
                        <span className="text-xs text-slate-500 bg-white/50 px-2 py-1 rounded-full">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-white border-t">
                  <div className="flex gap-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-blue-600 hover:bg-blue-700 shadow-lg px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuração do Bot */}
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
                    <div className="p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 hover:shadow-md transition-shadow">
                      <p className="font-medium text-sm text-slate-700 mb-1">🕐 Palavra-chave: "horário"</p>
                      <p className="text-sm text-slate-600">Resposta: "Nossos horários de atendimento são de segunda a sexta, das 8h às 18h."</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 hover:shadow-md transition-shadow">
                      <p className="font-medium text-sm text-slate-700 mb-1">💰 Palavra-chave: "valor"</p>
                      <p className="text-sm text-slate-600">Resposta: "Os valores variam conforme o tipo de consulta. Entre em contato para mais informações."</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-dashed border-2 hover:bg-purple-50 hover:border-purple-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Nova Resposta
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar direita */}
          <div className="space-y-6">
            {/* Informações do Cliente */}
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b">
                <CardTitle className="text-slate-900">Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <User2 className="h-4 w-4 text-slate-500" />
                    <div>
                      <Label className="text-xs text-slate-500 uppercase tracking-wide">Nome</Label>
                      <p className="font-medium text-slate-900">{clienteAtual.nome}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <div>
                      <Label className="text-xs text-slate-500 uppercase tracking-wide">Telefone</Label>
                      <p className="font-medium text-slate-900">{clienteAtual.telefone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <MessageCircle className="h-4 w-4 text-slate-500" />
                    <div>
                      <Label className="text-xs text-slate-500 uppercase tracking-wide">E-mail</Label>
                      <p className="font-medium text-slate-900">{clienteAtual.email}</p>
                    </div>
                  </div>
                </div>
                <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700 shadow-lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Contatar via WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Mensagens Rápidas */}
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b">
                <CardTitle className="text-slate-900">Mensagens Rápidas</CardTitle>
                <CardDescription>Clique para usar uma resposta pré-definida</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {quickMessages.map((msg, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto p-3 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                    onClick={() => setNewMessage(msg)}
                  >
                    <span className="text-sm leading-relaxed">{msg}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComunicacaoPage;
