
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ClienteFormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
}

interface ClienteFormProps {
  onSave: (cliente: ClienteFormData) => void;
  onBack: () => void;
}

const ClienteForm = ({ onSave, onBack }: ClienteFormProps) => {
  const [formData, setFormData] = useState<ClienteFormData>({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('E-mail é obrigatório');
      return;
    }
    if (!formData.telefone.trim()) {
      toast.error('Telefone é obrigatório');
      return;
    }

    setIsSubmitting(true);
    
    // Simular salvamento
    setTimeout(() => {
      onSave(formData);
      toast.success('Cliente cadastrado com sucesso!');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field: keyof ClienteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-900">Cadastrar Novo Cliente</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Dados do Cliente</span>
          </CardTitle>
          <CardDescription>
            Preencha as informações do novo cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Digite o nome completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="cliente@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleChange('endereco', e.target.value)}
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Cliente'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteForm;
