
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Phone, Mail, User, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

interface ClienteSearchProps {
  onClientSelect: (cliente: Cliente) => void;
  onNewClient: () => void;
  selectedClient?: Cliente;
}

const ClienteSearch = ({ onClientSelect, onNewClient, selectedClient }: ClienteSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - Em produção, isso viria da API
  const mockClientes: Cliente[] = [
    {
      id: '1',
      nome: 'Maria Silva Santos',
      email: 'maria.silva@email.com',
      telefone: '(11) 99999-9999',
      cpf: '123.456.789-01'
    },
    {
      id: '2',
      nome: 'João Carlos Oliveira',
      email: 'joao.carlos@email.com',
      telefone: '(11) 88888-8888',
      cpf: '987.654.321-02'
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error('Digite algo para buscar');
      return;
    }

    setIsSearching(true);
    
    // Simular busca na API
    setTimeout(() => {
      const results = mockClientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.telefone.includes(searchTerm) ||
        cliente.cpf.includes(searchTerm)
      );

      if (results.length === 0) {
        toast.error('Cliente não encontrado. Cadastre um novo cliente.');
        setTimeout(() => onNewClient(), 1500);
      } else {
        onClientSelect(results[0]);
        toast.success('Cliente encontrado!');
      }
      
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Buscar Cliente</span>
          </CardTitle>
          <CardDescription>
            Digite o nome, e-mail, telefone ou CPF do cliente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={onNewClient}
              className="flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Cadastrar Novo Cliente</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedClient && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Cliente Selecionado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{selectedClient.nome}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>{selectedClient.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{selectedClient.telefone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span>{selectedClient.cpf}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClienteSearch;
