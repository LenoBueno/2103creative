
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
  Settings,
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
  Mail,
  CalendarDays,
  Table2,
  Megaphone,
  Receipt
} from "lucide-react";

export type SidebarItem = {
  title: string;
  href?: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
};

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
  {
    title: "Configurações",
    icon: Settings,
    submenu: true,
    subMenuItems: [
      {
        title: "Fiscal",
        href: "/settings/fiscal",
        icon: Receipt,
      },
      {
        title: "Usuários",
        href: "/settings/users",
        icon: Users,
      },
      {
        title: "Email",
        href: "/settings/email",
        icon: Mail,
      },
    ],
  },
];
