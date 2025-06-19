import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Bot, ExternalLink, Phone, Plus } from 'lucide-react';
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <span>Comunicação com Cliente</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Chat - {clienteAtual.nome}</span>
                <Button onClick={openWhatsApp} size="sm" className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Abrir WhatsApp</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-3 bg-gray-50">
                {chatMessages.map((msg) => (
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Configuração do Bot</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Respostas Automáticas</Label>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <p className="font-medium text-sm">Palavra-chave: "horário"</p>
                    <p className="text-sm text-gray-600">Resposta: "Nossos horários de atendimento são de segunda a sexta, das 8h às 18h."</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-gray-50">
                    <p className="font-medium text-sm">Palavra-chave: "valor"</p>
                    <p className="text-sm text-gray-600">Resposta: "Os valores variam conforme o tipo de consulta. Entre em contato para mais informações."</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Nova Resposta
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm text-gray-600">Nome</Label>
                <p className="font-medium">{clienteAtual.nome}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Telefone</Label>
                <p className="font-medium">{clienteAtual.telefone}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">E-mail</Label>
                <p className="font-medium">{clienteAtual.email}</p>
              </div>
              <Button onClick={openWhatsApp} className="w-full mt-4">
                <Phone className="h-4 w-4 mr-2" />
                Contatar via WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Mensagens Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => setNewMessage('Obrigado pelo contato! Como posso ajudá-lo?')}
              >
                Saudação inicial
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => setNewMessage('Vou verificar a disponibilidade e retorno em breve.')}
              >
                Verificar disponibilidade
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left"
                onClick={() => setNewMessage('Seu agendamento foi confirmado. Nos vemos em breve!')}
              >
                Confirmar agendamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComunicacaoPage;
