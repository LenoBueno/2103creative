
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import { modules } from './sidebarData';
import { useSidebar } from '@/components/ui/sidebar';

const SidebarContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Store expanded menu state
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
      // Check main module path
      if (pathname === module.path || pathname.startsWith(module.path + '/')) {
        setActiveModule(module.id);
        foundActiveModule = true;
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
    
    // Don't toggle if sidebar is collapsed
    if (collapsed) return;
    
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

  return (
    <div className="py-2 space-y-1 flex-grow overflow-y-auto transition-all duration-300">
      {modules.map((module) => (
        <div key={module.id} className="transition-all duration-300">
          <SidebarItem 
            icon={<module.icon size={collapsed ? 20 : 18} />} 
            title={module.title} 
            active={activeModule === module.id} 
            path={module.path}
            hasSubmenu={module.hasSubmenu}
            expanded={expandedMenus[module.id]}
            onToggleSubmenu={(e) => toggleSubmenu(module.id, e)}
            onClick={() => handleModuleClick(module.id, module.path)}
            collapsed={collapsed}
          />
          
          {module.hasSubmenu && expandedMenus[module.id] && !collapsed && module.submenuItems && (
            <SidebarSubmenu 
              items={module.submenuItems} 
              onClick={(itemId, path) => navigate(path)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarContent;
