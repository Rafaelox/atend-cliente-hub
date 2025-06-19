
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Clock, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const TarefasPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockTarefas = [
    {
      id: '1',
      cliente: 'Maria Silva Santos',
      consultor: 'Dr. João',
      servico: 'Consulta Geral',
      hora: '09:00',
      status: 'pendente',
      tipo: 'agendamento'
    },
    {
      id: '2',
      cliente: 'João Carlos Oliveira',
      consultor: 'Dra. Ana',
      servico: 'Consulta Especializada',
      hora: '10:30',
      status: 'concluido',
      tipo: 'agendamento'
    },
    {
      id: '3',
      cliente: 'Ana Costa',
      consultor: 'Dr. Pedro',
      servico: 'Retorno',
      hora: '14:00',
      status: 'pendente',
      tipo: 'agendamento'
    }
  ];

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const toggleStatus = (id: string) => {
    // Em produção, atualizar status via API
    console.log('Toggle status for task:', id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <CheckSquare className="h-6 w-6" />
          <span>Tarefas do Dia</span>
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {selectedDate.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                {isToday(selectedDate) && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Hoje
                  </span>
                )}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedDate(new Date())}
              >
                Hoje
              </Button>
              <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTarefas.map((tarefa) => (
              <div key={tarefa.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleStatus(tarefa.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        tarefa.status === 'concluido'
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {tarefa.status === 'concluido' && (
                        <CheckSquare className="h-3 w-3" />
                      )}
                    </button>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{tarefa.hora}</span>
                        <span className="text-gray-500">-</span>
                        <span className="font-medium">{tarefa.servico}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{tarefa.cliente}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{tarefa.consultor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tarefa.status === 'concluido'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tarefa.status === 'concluido' ? 'Concluído' : 'Pendente'}
                    </span>
                    <Button size="sm" variant="outline">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Tarefas</p>
                <p className="text-xl font-semibold">{mockTarefas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Concluídas</p>
                <p className="text-xl font-semibold text-green-600">
                  {mockTarefas.filter(t => t.status === 'concluido').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-xl font-semibold text-yellow-600">
                  {mockTarefas.filter(t => t.status === 'pendente').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TarefasPage;
