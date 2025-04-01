import { Layers } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const SidebarHeader = () => {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  const handleToggleClick = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <button 
      className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none text-left"
      onClick={handleToggleClick}
      aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
      type="button"
    >
      <div className={cn(
        "flex items-center w-full transition-all duration-300",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <div className="flex items-center justify-center">
          <Layers 
            className="text-gray-700 dark:text-gray-300 flex-shrink-0 transition-all duration-300" 
            size={20} 
          />
        </div>
        
        {!collapsed && (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-300 opacity-100 tracking-tight">
            2103 CREATIVE
          </span>
        )}
      </div>
    </button>
  );
};

export default SidebarHeader;
