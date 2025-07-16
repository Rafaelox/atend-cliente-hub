
import React from 'react';
import { LogOut, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user?: { name: string; role: string };
  onLogout: () => void;
  onMenuToggle: () => void;
}

const Header = ({ user, onLogout, onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Agenda Oxum</h1>
            <p className="text-sm text-gray-500">Sistema de Gestão de Agendamentos</p>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{user.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {user.role}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
