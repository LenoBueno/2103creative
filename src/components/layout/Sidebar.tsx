
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarContent from './sidebar/SidebarContent';
import SidebarFooter from './sidebar/SidebarFooter';
import { SidebarRail } from '@/components/ui/sidebar';

const Sidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      <div 
        className={cn(
          "h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-10 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarHeader />
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <SidebarContent />
        </div>
        <SidebarFooter />
      </div>
      <SidebarRail />
    </>
  );
};

export default Sidebar;
