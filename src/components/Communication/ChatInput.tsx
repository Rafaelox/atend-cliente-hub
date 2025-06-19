
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInput = ({ newMessage, setNewMessage, onSendMessage }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="p-3 lg:p-6 bg-white border-t">
      <div className="flex gap-2 lg:gap-3">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-slate-50 border-slate-200 focus:bg-white transition-colors text-sm lg:text-base"
          onKeyPress={handleKeyPress}
        />
        <Button 
          onClick={onSendMessage}
          className="bg-blue-600 hover:bg-blue-700 shadow-lg px-3 lg:px-6"
          size="sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
