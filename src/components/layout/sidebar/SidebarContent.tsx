
import SidebarItem from './SidebarItem';
import SidebarSubmenu from './SidebarSubmenu';
import { modules } from './sidebarData';
import { useSidebar } from '@/components/ui/sidebar';
import { useSidebarNavigation } from '@/hooks/useSidebarNavigation';
import { useNavigate } from 'react-router-dom';

const SidebarContent = () => {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";
  const { activeModule, expandedMenus, toggleSubmenu, handleModuleClick } = useSidebarNavigation();

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
