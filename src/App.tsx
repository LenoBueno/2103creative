
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from '@/components/ui/toaster';

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Dashboard & Analytics
import Dashboard from "@/pages/Dashboard";
import Dashboards from "@/pages/analytics/Dashboards";
import Reports from "@/pages/analytics/Reports";
import KPIs from "@/pages/analytics/KPIs";

// Inventory
import Items from "@/pages/inventory/Items";
import Warehouses from "@/pages/inventory/Warehouses";
import Transfers from "@/pages/inventory/Transfers";

// Finance
import Accounting from "@/pages/finance/Accounting";
import Treasury from "@/pages/finance/Treasury";
import Taxes from "@/pages/finance/Taxes";
import FinanceReports from "@/pages/finance/Reports";

// Sales
import Customers from "@/pages/sales/Customers";
import Orders from "@/pages/sales/Orders";
import Campaigns from "@/pages/sales/Campaigns";
import Pricing from "@/pages/sales/Pricing";

// Purchases
import Suppliers from "@/pages/purchases/Suppliers";
import PurchaseOrders from "@/pages/purchases/Orders";
import Quotations from "@/pages/purchases/Quotations";

// Production
import ProductionOrders from "@/pages/production/Orders";
import Planning from "@/pages/production/Planning";
import Resources from "@/pages/production/Resources";

// Settings
import Settings from "@/pages/settings/Settings";
import FiscalConfig from "@/pages/settings/FiscalConfig";
import Users from "@/pages/settings/Users";
import Email from "@/pages/settings/Email";

// Fiscal
import NFeList from "@/pages/fiscal/NFeList";
import NFePage from "@/pages/fiscal/NFe";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="erplight-theme">
      <Router>
        <Routes>
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Protected routes that need authentication */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Index />} />
          
          <Route path="/analytics/dashboards" element={<Dashboards />} />
          <Route path="/analytics/reports" element={<Reports />} />
          <Route path="/analytics/kpis" element={<KPIs />} />
          
          <Route path="/inventory/items" element={<Items />} />
          <Route path="/inventory/warehouses" element={<Warehouses />} />
          <Route path="/inventory/transfers" element={<Transfers />} />
          
          <Route path="/finance/accounting" element={<Accounting />} />
          <Route path="/finance/treasury" element={<Treasury />} />
          <Route path="/finance/taxes" element={<Taxes />} />
          <Route path="/finance/reports" element={<FinanceReports />} />
          
          <Route path="/sales/customers" element={<Customers />} />
          <Route path="/sales/orders" element={<Orders />} />
          <Route path="/sales/campaigns" element={<Campaigns />} />
          <Route path="/sales/pricing" element={<Pricing />} />
          
          <Route path="/purchases/suppliers" element={<Suppliers />} />
          <Route path="/purchases/orders" element={<PurchaseOrders />} />
          <Route path="/purchases/quotations" element={<Quotations />} />
          
          <Route path="/production/orders" element={<ProductionOrders />} />
          <Route path="/production/planning" element={<Planning />} />
          <Route path="/production/resources" element={<Resources />} />
          
          {/* Settings Routes */}
          <Route path="/settings" element={<Settings />}>
            <Route index element={<Navigate to="/settings/fiscal" replace />} />
            <Route path="fiscal" element={<FiscalConfig />} />
            <Route path="users" element={<Users />} />
            <Route path="email" element={<Email />} />
          </Route>
          
          {/* Fiscal Routes */}
          <Route path="/fiscal/nfe" element={<NFeList />} />
          <Route path="/fiscal/nfe/nova" element={<NFePage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
