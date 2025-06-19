
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign, User, Calendar, Plus } from 'lucide-react';
import { toast } from 'sonner';

const PagamentosPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    consultor: '',
    servico: '',
    valor: '',
    formaPagamento: '',
    observacoes: ''
  });

  const mockPagamentos = [
    {
      id: '1',
      cliente: 'Maria Silva Santos',
      consultor: 'Dr. João',
      servico: 'Consulta Geral',
      valor: 150.00,
      formaPagamento: 'PIX',
      data: '2024-01-10',
      status: 'confirmado'
    },
    {
      id: '2',
      cliente: 'João Carlos Oliveira',
      consultor: 'Dra. Ana',
      servico: 'Consulta Especializada',
      valor: 200.00,
      formaPagamento: 'Cartão de Crédito',
      data: '2024-01-08',
      status: 'confirmado'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cliente || !formData.valor || !formData.formaPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simular salvamento
    toast.success('Pagamento registrado com sucesso!');
    setShowForm(false);
    setFormData({
      cliente: '',
      consultor: '',
      servico: '',
      valor: '',
      formaPagamento: '',
      observacoes: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span>Área de Pagamentos</span>
        </h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Pagamento
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Novo Pagamento</CardTitle>
            <CardDescription>
              Preencha as informações do pagamento recebido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => handleChange('cliente', e.target.value)}
                    placeholder="Nome do cliente"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="consultor">Consultor</Label>
                  <Select value={formData.consultor} onValueChange={(value) => handleChange('consultor', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-joao">Dr. João</SelectItem>
                      <SelectItem value="dra-ana">Dra. Ana</SelectItem>
                      <SelectItem value="dr-pedro">Dr. Pedro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servico">Serviço</Label>
                  <Select value={formData.servico} onValueChange={(value) => handleChange('servico', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta-geral">Consulta Geral</SelectItem>
                      <SelectItem value="consulta-especializada">Consulta Especializada</SelectItem>
                      <SelectItem value="retorno">Retorno</SelectItem>
                      <SelectItem value="exame">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor (R$) *</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => handleChange('valor', e.target.value)}
                    placeholder="0,00"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                  <Select value={formData.formaPagamento} onValueChange={(value) => handleChange('formaPagamento', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="cartao-debito">Cartão de Débito</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Input
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleChange('observacoes', e.target.value)}
                    placeholder="Observações adicionais (opcional)"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button type="submit">Salvar Pagamento</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>
            Visualize todos os pagamentos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPagamentos.map((pagamento) => (
              <div key={pagamento.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">R$ {pagamento.valor.toFixed(2)}</span>
                      <span className="text-gray-400">-</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {pagamento.formaPagamento}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{pagamento.cliente}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{pagamento.consultor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(pagamento.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      Confirmado
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
    </div>
  );
};

export default PagamentosPage;
