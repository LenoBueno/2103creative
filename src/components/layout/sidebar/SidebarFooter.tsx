import { useSidebar } from '@/components/ui/sidebar';

const SidebarFooter = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-2 transition-all duration-300">
      <div className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">
        {!collapsed && (
          <span className="block">&copy; 2103 CREATIVE - 2025</span>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
