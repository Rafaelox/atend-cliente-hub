
import React from 'react';
import { Clock, User2, Bot } from 'lucide-react';

interface ChatMessageProps {
  id: string;
  sender: 'cliente' | 'bot' | 'atendente';
  message: string;
  timestamp: Date;
  clientName: string;
}

const ChatMessage = ({ sender, message, timestamp, clientName }: ChatMessageProps) => {
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
        return 'bg-slate-100 text-slate-900 border-l-4 border-l-blue-500';
      case 'bot':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 border-l-4 border-l-blue-400';
      case 'atendente':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-900 border-l-4 border-l-green-500 ml-8';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className={`p-4 rounded-xl shadow-sm ${getSenderStyle(sender)}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm">
          {getSenderName(sender)}
        </span>
        <span className="text-xs text-slate-500 bg-white/50 px-2 py-1 rounded-full">
          {formatTime(timestamp)}
        </span>
      </div>
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  );
};

export default ChatMessage;
