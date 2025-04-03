
import { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItemProps {
  icon: ReactNode;
  title: string;
  active?: boolean;
  path: string;
  expanded?: boolean;
  hasSubmenu?: boolean;
  onToggleSubmenu?: (e: MouseEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ 
  icon, 
  title, 
  active, 
  path, 
  expanded, 
  hasSubmenu, 
  onToggleSubmenu,
  onClick,
  collapsed 
}: SidebarItemProps) => {
  
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // Call the onClick handler
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-center h-10 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-300 ease-in-out mx-2 cursor-pointer",
        active && "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
      )}
      onClick={handleClick}
    >
      <div className="text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0">
        {icon}
      </div>
      
      {!collapsed && (
        <>
          <span className="ml-3 flex-1 truncate transition-opacity duration-300">
            {title}
          </span>
          
          {hasSubmenu && (
            <ChevronDown 
              size={16} 
              className={cn(
                "text-gray-400 dark:text-gray-500 transition-transform duration-300 flex-shrink-0",
                expanded && "transform rotate-180"
              )} 
              onClick={onToggleSubmenu ? (e) => {
                e.stopPropagation();
                onToggleSubmenu(e);
              } : undefined}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SidebarItem;
