
import { ReactNode } from 'react';
import Header from './Header';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import SidebarMainContent from './sidebar/SidebarContent';
import SidebarMainFooter from './sidebar/SidebarFooter';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarMainContent />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMainFooter />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
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
