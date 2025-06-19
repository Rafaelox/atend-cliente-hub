
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { History, Calendar, User, Briefcase, DollarSign, Filter } from 'lucide-react';

const HistoricoPage = () => {
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('todos');

  const mockHistorico = [
    {
      id: '1',
      tipo: 'agendamento',
      cliente: 'Maria Silva Santos',
      descricao: 'Consulta Geral com Dr. João',
      data: '2024-01-10',
      valor: 150.00,
      status: 'concluído'
    },
    {
      id: '2',
      tipo: 'pagamento',
      cliente: 'Maria Silva Santos',
      descricao: 'Pagamento de consulta - PIX',
      data: '2024-01-10',
      valor: 150.00,
      status: 'confirmado'
    },
    {
      id: '3',
      tipo: 'agendamento',
      cliente: 'João Carlos Oliveira',
      descricao: 'Consulta Especializada com Dra. Ana',
      data: '2024-01-08',
      valor: 200.00,
      status: 'concluído'
    }
  ];

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case 'agendamento':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'pagamento':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      default:
        return <Briefcase className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluído':
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <History className="h-6 w-6" />
          <span>Histórico do Cliente</span>
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="Filtrar por data"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={filterType === 'todos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('todos')}
              >
                Todos
              </Button>
              <Button 
                variant={filterType === 'agendamento' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('agendamento')}
              >
                Agendamentos
              </Button>
              <Button 
                variant={filterType === 'pagamento' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('pagamento')}
              >
                Pagamentos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
          <CardDescription>
            Visualize todo o histórico de agendamentos e pagamentos do cliente selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistorico.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getIconByType(item.tipo)}
                      <span className="font-medium">{item.descricao}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{item.cliente}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>R$ {item.valor.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricoPage;
