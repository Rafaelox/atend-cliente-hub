
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import ClientesPage from "./pages/ClientesPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import HistoricoPage from "./pages/HistoricoPage";
import TarefasPage from "./pages/TarefasPage";
import PagamentosPage from "./pages/PagamentosPage";
import ComunicacaoPage from "./pages/ComunicacaoPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/clientes" replace />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/clientes" element={<ClientesPage />} />
                    <Route path="/agendamentos" element={<AgendamentosPage />} />
                    <Route path="/historico" element={<HistoricoPage />} />
                    <Route path="/tarefas" element={<TarefasPage />} />
                    <Route path="/pagamentos" element={<PagamentosPage />} />
                    <Route path="/comunicacao" element={<ComunicacaoPage />} />
                    <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
