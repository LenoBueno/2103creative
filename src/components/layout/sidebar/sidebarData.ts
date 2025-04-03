import {
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Package,
  CircleDollarSign,
  BarChart3,
  Factory,
  ClipboardList,
  FileText,
  Truck,
  Box,
  Repeat,
  CreditCard,
  Calculator,
  BookOpen,
  TrendingUp,
  BadgeDollarSign,
  Building2,
  Tags,
  LineChart,
  PieChart,
  Target,
  CalendarDays,
  Table2,
  Megaphone
} from "lucide-react";

export type SidebarItem = {
  title: string;
  href?: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
};

// The original SIDEBAR_ITEMS structure
export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendas",
    icon: ShoppingBasket,
    submenu: true,
    subMenuItems: [
      {
        title: "Clientes",
        href: "/sales/customers",
        icon: Users,
      },
      {
        title: "Pedidos",
        href: "/sales/orders",
        icon: ClipboardList,
      },
      {
        title: "Campanhas",
        href: "/sales/campaigns",
        icon: Megaphone,
      },
      {
        title: "Preços",
        href: "/sales/pricing",
        icon: Tags,
      },
    ],
  },
  {
    title: "Estoque",
    icon: Package,
    submenu: true,
    subMenuItems: [
      {
        title: "Itens",
        href: "/inventory/items",
        icon: Box,
      },
      {
        title: "Depósitos",
        href: "/inventory/warehouses",
        icon: Building2,
      },
      {
        title: "Transferências",
        href: "/inventory/transfers",
        icon: Repeat,
      },
    ],
  },
  {
    title: "Financeiro",
    icon: CircleDollarSign,
    submenu: true,
    subMenuItems: [
      {
        title: "Contabilidade",
        href: "/finance/accounting",
        icon: BookOpen,
      },
      {
        title: "Tesouraria",
        href: "/finance/treasury",
        icon: BadgeDollarSign,
      },
      {
        title: "Impostos",
        href: "/finance/taxes",
        icon: Calculator,
      },
      {
        title: "Relatórios",
        href: "/finance/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Compras",
    icon: CreditCard,
    submenu: true,
    subMenuItems: [
      {
        title: "Fornecedores",
        href: "/purchases/suppliers",
        icon: Truck,
      },
      {
        title: "Pedidos",
        href: "/purchases/orders",
        icon: ClipboardList,
      },
      {
        title: "Cotações",
        href: "/purchases/quotations",
        icon: FileText,
      },
    ],
  },
  {
    title: "Produção",
    icon: Factory,
    submenu: true,
    subMenuItems: [
      {
        title: "Ordens",
        href: "/production/orders",
        icon: ClipboardList,
      },
      {
        title: "Planejamento",
        href: "/production/planning",
        icon: CalendarDays,
      },
      {
        title: "Recursos",
        href: "/production/resources",
        icon: Table2,
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    submenu: true,
    subMenuItems: [
      {
        title: "Painéis",
        href: "/analytics/dashboards",
        icon: LineChart,
      },
      {
        title: "Relatórios",
        href: "/analytics/reports",
        icon: PieChart,
      },
      {
        title: "KPIs",
        href: "/analytics/kpis",
        icon: Target,
      },
    ],
  },
];

// Define the modules structure that SidebarContent.tsx is expecting
export const modules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    hasSubmenu: false,
  },
  {
    id: 'sales',
    title: 'Vendas',
    path: '/sales',
    icon: ShoppingBasket,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'customers',
        title: 'Clientes',
        path: '/sales/customers',
        icon: Users,
      },
      {
        id: 'orders',
        title: 'Pedidos',
        path: '/sales/orders',
        icon: ClipboardList,
      },
      {
        id: 'campaigns',
        title: 'Campanhas',
        path: '/sales/campaigns',
        icon: Megaphone,
      },
      {
        id: 'pricing',
        title: 'Preços',
        path: '/sales/pricing',
        icon: Tags,
      },
    ],
  },
  {
    id: 'inventory',
    title: 'Estoque',
    path: '/inventory',
    icon: Package,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'items',
        title: 'Itens',
        path: '/inventory/items',
        icon: Box,
      },
      {
        id: 'warehouses',
        title: 'Depósitos',
        path: '/inventory/warehouses',
        icon: Building2,
      },
      {
        id: 'transfers',
        title: 'Transferências',
        path: '/inventory/transfers',
        icon: Repeat,
      },
    ],
  },
  {
    id: 'finance',
    title: 'Financeiro',
    path: '/finance',
    icon: CircleDollarSign,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'accounting',
        title: 'Contabilidade',
        path: '/finance/accounting',
        icon: BookOpen,
      },
      {
        id: 'treasury',
        title: 'Tesouraria',
        path: '/finance/treasury',
        icon: BadgeDollarSign,
      },
      {
        id: 'taxes',
        title: 'Impostos',
        path: '/finance/taxes',
        icon: Calculator,
      },
      {
        id: 'reports',
        title: 'Relatórios',
        path: '/finance/reports',
        icon: FileText,
      },
    ],
  },
  {
    id: 'purchases',
    title: 'Compras',
    path: '/purchases',
    icon: CreditCard,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'suppliers',
        title: 'Fornecedores',
        path: '/purchases/suppliers',
        icon: Truck,
      },
      {
        id: 'orders',
        title: 'Pedidos',
        path: '/purchases/orders',
        icon: ClipboardList,
      },
      {
        id: 'quotations',
        title: 'Cotações',
        path: '/purchases/quotations',
        icon: FileText,
      },
    ],
  },
  {
    id: 'production',
    title: 'Produção',
    path: '/production',
    icon: Factory,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'orders',
        title: 'Ordens',
        path: '/production/orders',
        icon: ClipboardList,
      },
      {
        id: 'planning',
        title: 'Planejamento',
        path: '/production/planning',
        icon: CalendarDays,
      },
      {
        id: 'resources',
        title: 'Recursos',
        path: '/production/resources',
        icon: Table2,
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'dashboards',
        title: 'Painéis',
        path: '/analytics/dashboards',
        icon: LineChart,
      },
      {
        id: 'reports',
        title: 'Relatórios',
        path: '/analytics/reports',
        icon: PieChart,
      },
      {
        id: 'kpis',
        title: 'KPIs',
        path: '/analytics/kpis',
        icon: Target,
      },
    ],
  },
];
