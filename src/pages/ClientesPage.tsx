
import React, { useState } from 'react';
import ClienteSearch from '@/components/Cliente/ClienteSearch';
import ClienteForm from '@/components/Cliente/ClienteForm';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

const ClientesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Cliente | undefined>();

  const handleClientSelect = (cliente: Cliente) => {
    setSelectedClient(cliente);
    setShowForm(false);
  };

  const handleNewClient = () => {
    setShowForm(true);
  };

  const handleSaveClient = (clienteData: any) => {
    // Em produção, salvar via API
    const newClient: Cliente = {
      id: Date.now().toString(),
      nome: clienteData.nome,
      email: clienteData.email,
      telefone: clienteData.telefone,
      cpf: clienteData.cpf
    };
    
    setSelectedClient(newClient);
    setShowForm(false);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {showForm ? (
        <ClienteForm onSave={handleSaveClient} onBack={handleBack} />
      ) : (
        <ClienteSearch 
          onClientSelect={handleClientSelect}
          onNewClient={handleNewClient}
          selectedClient={selectedClient}
        />
      )}
    </div>
  );
};

export default ClientesPage;
