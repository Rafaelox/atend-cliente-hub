
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Briefcase } from 'lucide-react';

const AgendamentosPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockAgendamentos = [
    {
      id: '1',
      cliente: 'Maria Silva Santos',
      consultor: 'Dr. João',
      servico: 'Consulta Geral',
      data: '2024-01-15',
      hora: '09:00',
      status: 'confirmado'
    },
    {
      id: '2',
      cliente: 'João Carlos Oliveira',
      consultor: 'Dra. Ana',
      servico: 'Consulta Especializada',
      data: '2024-01-15',
      hora: '10:30',
      status: 'pendente'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agenda do Dia</CardTitle>
            <CardDescription>
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAgendamentos.map((agendamento) => (
                <div key={agendamento.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{agendamento.cliente}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{agendamento.hora}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{agendamento.consultor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-3 w-3" />
                          <span>{agendamento.servico}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        agendamento.status === 'confirmado' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {agendamento.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                      </span>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total de agendamentos</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confirmados</span>
                  <span className="font-medium text-green-600">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pendentes</span>
                  <span className="font-medium text-yellow-600">1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Semana
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Horários Livres
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgendamentosPage;
