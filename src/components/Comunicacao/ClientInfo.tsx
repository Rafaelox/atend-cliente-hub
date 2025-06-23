
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Cliente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label className="text-sm text-gray-600">Nome</Label>
          <p className="font-medium">{cliente.nome}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-600">Telefone</Label>
          <p className="font-medium">{cliente.telefone}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-600">E-mail</Label>
          <p className="font-medium">{cliente.email}</p>
        </div>
        <Button onClick={onOpenWhatsApp} className="w-full mt-4">
          <Phone className="h-4 w-4 mr-2" />
          Contatar via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
