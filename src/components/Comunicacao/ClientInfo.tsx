
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Phone, User, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Cliente {
  nome: string;
  telefone: string;
  email: string;
}

interface ClientInfoProps {
  cliente: Cliente;
  onOpenWhatsApp: () => void;
}

const ClientInfo = ({ cliente, onOpenWhatsApp }: ClientInfoProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="shadow-sm">
      <CardHeader className={isMobile ? 'pb-3' : ''}>
        <CardTitle className={`flex items-center space-x-2 ${isMobile ? 'text-lg' : ''}`}>
          <User className="h-5 w-5" />
          <span>Cliente</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-3 ${isMobile ? 'px-3' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Label className="text-xs text-gray-600">Nome</Label>
              <p className={`font-medium truncate ${isMobile ? 'text-sm' : ''}`}>{cliente.nome}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Label className="text-xs text-gray-600">Telefone</Label>
              <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{cliente.telefone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Label className="text-xs text-gray-600">E-mail</Label>
              <p className={`font-medium truncate ${isMobile ? 'text-sm' : ''}`}>{cliente.email}</p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onOpenWhatsApp} 
          className={`w-full ${isMobile ? 'mt-3 py-3' : 'mt-4'} bg-green-600 hover:bg-green-700`}
          size={isMobile ? "default" : "default"}
        >
          <Phone className="h-4 w-4 mr-2" />
          <span>Contatar via WhatsApp</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
