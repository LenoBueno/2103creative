
import { cn } from '@/lib/utils';

interface SidebarSubmenuItemType {
  id: string;
  title: string;
  path: string;
  icon?: any;
}

interface SidebarSubmenuProps {
  items: SidebarSubmenuItemType[];
  onClick?: (itemId: string, path: string) => void;
}

const SidebarSubmenu = ({ items, onClick }: SidebarSubmenuProps) => {
  const handleClick = (itemId: string, path: string) => {
    if (onClick) {
      onClick(itemId, path);
    }
  };

  return (
    <ul className="pl-10 pr-2 py-1 space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <div
            onClick={() => handleClick(item.id, item.path)}
            className={cn(
              "flex items-center h-8 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 transition-colors cursor-pointer",
            )}
          >
            {item.icon && (
              <div className="text-gray-500 dark:text-gray-400 mr-2">
                <item.icon size={16} />
              </div>
            )}
            <span className="truncate">{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SidebarSubmenu;
