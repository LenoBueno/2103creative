
import { ReactNode } from 'react';
import Header from './Header';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      <div className="h-screen fixed top-0 left-0 z-30">
        <Sidebar />
      </div>
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'ml-16' : 'ml-64'}`}
      >
        <Header />
        <main className="flex-1 p-6 bg-background text-foreground pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
};

export default MainLayout;
