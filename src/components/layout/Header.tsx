
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageCircle, 
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Menu,
  Mail,
  Receipt
} from 'lucide-react';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center w-96">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="mr-4 p-1.5 rounded-md hover:bg-muted"
          >
            <Menu size={20} className="text-foreground" />
          </button>
        )}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted text-foreground rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <button className="p-1.5 rounded-md hover:bg-muted relative">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-1.5 rounded-md hover:bg-muted relative">
          <MessageCircle size={20} className="text-foreground" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-muted">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                JD
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-0" align="end">
            <div className="p-4 border-b border-border">
              <p className="font-medium text-sm">João Silva</p>
              <p className="text-xs text-muted-foreground">joao.silva@exemplo.com</p>
            </div>
            <div className="py-2">
              <DropdownMenuItem 
                className="w-full px-4 py-2 text-sm cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                <User size={16} className="mr-2 text-muted-foreground" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="w-full flex items-center px-4 py-2 text-sm cursor-pointer"
                onClick={() => navigate('/settings/fiscal')}
              >
                <Settings size={16} className="mr-2 text-muted-foreground" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="w-full flex items-center px-4 py-2 text-sm cursor-pointer"
                onClick={() => window.open('https://suporte.exemplo.com', '_blank')}
              >
                <HelpCircle size={16} className="mr-2 text-muted-foreground" />
                Ajuda & Suporte
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="py-2">
              <DropdownMenuItem 
                className="w-full flex items-center px-4 py-2 text-sm text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
