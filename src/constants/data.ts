import {
  MdDashboard,
  MdRestaurantMenu,
  MdShoppingCart,
  MdAssessment,
  MdSettings,
  MdAttachMoney,
  MdPeople,
  MdTrendingDown,
  MdTableRestaurant,
} from "react-icons/md";
import { IconType } from "react-icons";

export interface MenuItem {
  name: string;
  icon: IconType;
  href: string;
}

export const overviewItems = [
  { name: "Dashboard", icon: MdDashboard, href: "/dashboard" },
  { name: "Orders", icon: MdShoppingCart, href: "/dashboard/orders" },
  { name: "Products", icon: MdRestaurantMenu, href: "/dashboard/products" },
  { name: "Customers", icon: MdPeople, href: "/dashboard/customers" },
  { name: "Finance", icon: MdAttachMoney, href: "/dashboard/finance" },
  { name: "Discount", icon: MdAssessment, href: "/dashboard/discount" },
  { name: "Inventory", icon: MdTableRestaurant, href: "/dashboard/inventory" },
];

export const managementItems = [
  { name: "Staffs", icon: MdPeople, href: "/dashboard/staffs" },
  { name: "Expenses", icon: MdAttachMoney, href: "/dashboard/expenses" },
  { name: "Report", icon: MdAssessment, href: "/dashboard/report" },
  { name: "Email", icon: MdSettings, href: "/dashboard/email" },
  { name: "Leads", icon: MdPeople, href: "/dashboard/leads" },
];

export const systemItems = [
  { name: "History", icon: MdAssessment, href: "/dashboard/history" },
  { name: "Support", icon: MdSettings, href: "/dashboard/support" },
];

export interface AnalyticsItem {
  title: string;
  amount: string;
  percentage: string;
  time: string;
  icon: IconType;
}


export const analytics: AnalyticsItem[] = [
  {
    title: "Total Customers",
    amount: "2",
    percentage: "+5%",
    time: "Compared to last month",
    icon: MdPeople,
  },
  {
    title: "Total Expenses",
    amount: "100",
    percentage: "-4%",
    time: "Compared to last month",
    icon: MdTrendingDown,
  },
];
