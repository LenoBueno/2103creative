
import { ReactNode } from 'react';
import Header from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
