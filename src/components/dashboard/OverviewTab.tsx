
import PerformanceCards from './PerformanceCards';
import ChartSection from './ChartSection';
import AlertsSection from './AlertsSection';

const OverviewTab = () => {
  return (
    <div className="space-y-4">
      <PerformanceCards />
      <ChartSection />
      <AlertsSection />
    </div>
  );
};

export default OverviewTab;
