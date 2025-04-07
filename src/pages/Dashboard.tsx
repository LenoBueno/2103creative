
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PerformanceCards from "@/components/dashboard/PerformanceCards";
import OverviewTab from "@/components/dashboard/OverviewTab";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <PerformanceCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewTab />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
