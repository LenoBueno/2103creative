
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import { modules } from './sidebarData';
import { useSidebar } from '@/components/ui/sidebar';

const SidebarContent = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [activeModule, setActiveModule] = useState('dashboard');
  
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    finance: false,
    sales: false,
    purchases: false,
    inventory: false,
    production: false,
    analytics: false,
    administration: false,
  });

  // Função para determinar qual menu deve estar aberto com base na rota atual
  useEffect(() => {
    const pathname = location.pathname;
    
    // Verificar cada módulo para ver se a rota atual pertence a ele
    modules.forEach(module => {
      if (module.submenuItems) {
        const isSubmenuActive = module.submenuItems.some(item => 
          pathname.includes(item.path)
        );
        
        if (isSubmenuActive) {
          setExpandedMenus(prev => ({
            ...prev,
            [module.id]: true
          }));
          
          setActiveModule(module.id);
        }
      }
    });
  }, [location.pathname]);

  const toggleSubmenu = (menu: string) => {
    if (collapsed) return;
    
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  return (
    <div className="py-4 space-y-1 flex-grow">
      {modules.map((module) => (
        <div key={module.id}>
          <SidebarItem 
            icon={<module.icon size={20} />} 
            title={module.title} 
            active={activeModule === module.id} 
            path={module.path}
            hasSubmenu={module.hasSubmenu}
            expanded={expandedMenus[module.id]}
            onToggleSubmenu={() => toggleSubmenu(module.id)}
            onClick={() => handleModuleClick(module.id)}
            collapsed={collapsed}
          />
          
          {module.hasSubmenu && expandedMenus[module.id] && !collapsed && module.submenuItems && (
            <SidebarSubmenu items={module.submenuItems} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarContent;
