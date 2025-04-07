
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { modules } from '@/components/layout/sidebar/sidebarData';

export const useSidebarNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Store expanded menu state with proper typing
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    finance: false,
    sales: false,
    purchases: false,
    inventory: false,
    production: false,
    analytics: false,
    administration: false,
  });

  // Determine which menu should be open based on the current route
  useEffect(() => {
    const pathname = location.pathname;
    let foundActiveModule = false;
    
    // Check each module to see if the current route belongs to it
    modules.forEach(module => {
      // Check if current path matches the module path or starts with it
      if (pathname === module.path || 
          (module.path !== '/dashboard' && pathname.startsWith(module.path + '/'))) {
        setActiveModule(module.id);
        foundActiveModule = true;
        
        // If this is a module with submenu, expand it
        if (module.hasSubmenu) {
          setExpandedMenus(prev => ({
            ...prev,
            [module.id]: true
          }));
        }
      }
      
      // Check submenus if present
      if (module.submenuItems) {
        const isSubmenuActive = module.submenuItems.some(item => 
          pathname === item.path || pathname.startsWith(item.path + '/')
        );
        
        if (isSubmenuActive) {
          setExpandedMenus(prev => ({
            ...prev,
            [module.id]: true
          }));
          
          setActiveModule(module.id);
          foundActiveModule = true;
        }
      }
    });
    
    // If we didn't find an active module, default to dashboard
    if (!foundActiveModule) {
      setActiveModule('dashboard');
    }
  }, [location.pathname]);

  const toggleSubmenu = (menu: string, e?: React.MouseEvent) => {
    // Stop propagation if event is provided
    if (e) {
      e.stopPropagation();
    }
    
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const handleModuleClick = (moduleId: string, path: string) => {
    // Set active module
    setActiveModule(moduleId);
    
    // Navigate to the route
    navigate(path);
  };

  return {
    activeModule,
    expandedMenus,
    toggleSubmenu,
    handleModuleClick
  };
};
