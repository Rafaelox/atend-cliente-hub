
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User2, Phone, MessageCircle } from 'lucide-react';

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
              <p className="font-medium text-slate-900">{cliente.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Phone className="h-4 w-4 text-slate-500" />
            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wide">Telefone</Label>
              <p className="font-medium text-slate-900">{cliente.telefone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <MessageCircle className="h-4 w-4 text-slate-500" />
            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wide">E-mail</Label>
              <p className="font-medium text-slate-900">{cliente.email}</p>
            </div>
          </div>
        </div>
        <Button onClick={onOpenWhatsApp} className="w-full bg-green-600 hover:bg-green-700 shadow-lg">
          <Phone className="h-4 w-4 mr-2" />
          Contatar via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
