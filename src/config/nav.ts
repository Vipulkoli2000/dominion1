// Application navigation tree definition. Items filtered at runtime based on user permissions.
// Keeps UI structure & required permissions centralized (avoid scattering nav logic).
import { PERMISSIONS } from "@/config/roles";

import {
  LayoutDashboard,
  Users,
  Settings,
  ClipboardList,
  Database,
  FileText,
  Users2,
  List,
  Activity,
  Building,
  MapPin,
  FolderOpen,
  Receipt,
  Layers,
  CheckSquare,
  Mail,
  ArrowRightLeft,
  FileInput,
  FileOutput,
  CircleCheck,
  Ban,
  Archive,
  Wallet,
  DollarSign,
  Quote,
  TrendingUp,
  BarChart,
  FileDigit,
  HardHat,
  Clock,
  BookOpen,
  ScrollText,
  Bell,
  Landmark,
  Shield,
  Briefcase,
  XCircle,
  Folder,
  Calendar,
} from "lucide-react";
import type { ComponentType } from "react";

export type NavLeafItem = {
  type?: "item";
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  permission: string; // permission required to view
};

export type NavStaticItem = {
  type: "static";
  title: string;
  icon?: ComponentType<{ className?: string }>;
};

export type NavGroupItem = {
  type: "group";
  title: string;
  icon: ComponentType<{ className?: string }>;
  permission?: string; // optional permission for the group itself
  children: (NavLeafItem | NavGroupItem | NavStaticItem)[]; // support nested groups
};

export type NavItem = NavLeafItem | NavGroupItem | NavStaticItem;

export function isStatic(item: NavItem): item is NavStaticItem {
  return (item as any)?.type === "static";
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },
  {
    type: "group",
    title: "Masters",
    icon: Database,
    permission: PERMISSIONS.VIEW_MASTERS,
    children: [
      {
        title: "Announcements",
        href: "/masters/announcements",
        icon: Mail,
        permission: PERMISSIONS.VIEW_MASTERS,
      },
      { type: "static", title: "Client Information", icon: Users },
      { type: "static", title: "Stake Holders", icon: Users2 },
      { type: "static", title: "Projects Tasks", icon: ClipboardList },
      { type: "static", title: "Lead Types", icon: List },
      { type: "static", title: "Project Types", icon: Layers },
      { type: "static", title: "Activities", icon: Activity },
      { type: "static", title: "Departments", icon: Building },
      { type: "static", title: "Designations", icon: FileText },
      { type: "static", title: "Employees", icon: Users },
      { type: "static", title: "Locations", icon: MapPin },
      { type: "static", title: "File Nos", icon: FolderOpen },
      { type: "static", title: "Expense Heads", icon: Receipt },
      { type: "static", title: "Design Stages", icon: Layers },
      { type: "static", title: "Statutory Stages", icon: CheckSquare },
      { type: "static", title: "Checklist Sections", icon: List },
      { type: "static", title: "Checklist Items", icon: CheckSquare },
      { type: "static", title: "Email Templates", icon: Mail },
    ],
  },
  {
    type: "group",
    title: "Projects",
    icon: Briefcase,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Pipeline Projects",
        href: "/pipeline-projects",
        icon: ClipboardList,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
      { type: "static", title: "Closed Projects", icon: CircleCheck },
      { type: "static", title: "Ongoing Projects", icon: Activity },
      { type: "static", title: "Hold Projects", icon: Ban },
      { type: "static", title: "Archived Projects", icon: Archive },
      { type: "static", title: "Project List", icon: List },
    ],
  },
  {
    type: "group",
    title: "Task Management",
    icon: ClipboardList,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Task",
        href: "/tasks",
        icon: CheckSquare,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
      { type: "static", title: "Project Tasks", icon: List },
      { type: "static", title: "Project Stages", icon: Layers },
      { type: "static", title: "Daily Tasks", icon: CheckSquare },
      { type: "static", title: "Tasks Overviews", icon: Activity },
      { type: "static", title: "Project Tasks Overviews", icon: FileText },
    ],
  },
  {
    type: "group",
    title: "Inward / Outward",
    icon: ArrowRightLeft,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Inward / Outwards",
        href: "#",
        icon: ArrowRightLeft,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
    ],
  },
    {
    type: "group",
    title: "Design Drive",
    icon: FolderOpen,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Design Drive",
        href: "#",
        icon: FolderOpen,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
    ],
  },
  {
    type: "group",
    title: "Statutory Drive",
    icon: CheckSquare,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Statutory Drive",
        href: "#",
        icon: FileText,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
    ],
  },
   {
    type: "group",
    title: "Project Drive",
    icon: FolderOpen,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      {
        title: "Project Drive",
        href: "#",
        icon: FolderOpen,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
    ],
  },
 
  {
    type: "group",
    title: "Invoicing",
    icon: DollarSign,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "Expenses", icon: Wallet },
      { type: "static", title: "Invoices", icon: Receipt },
      { type: "static", title: "Service Invoices", icon: FileText },
    ],
  },
   {
    type: "group",
    title: "Receipts",
    icon: Wallet,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "Invoice Receipts", icon: CheckSquare },
      { type: "static", title: "Service Receipts", icon: FileText },
    ],
  },
 
 
 
  {
    type: "group",
    title: "Reports",
    icon: BarChart,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "Quotations", icon: Quote },
      { type: "static", title: "Projects", icon: Briefcase },
      { type: "static", title: "Invoices", icon: Receipt },
      { type: "static", title: "Service Invoices", icon: FileText },
      { type: "static", title: "Invoice Receipts", icon: CheckSquare },
      { type: "static", title: "Service Receipts", icon: FileText },
      { type: "static", title: "Expense", icon: DollarSign },
      { type: "static", title: "Daily Tasks", icon: ClipboardList },
      { type: "static", title: "Inward Outward Register", icon: ArrowRightLeft },
      { type: "static", title: "Projected Billing Report", icon: TrendingUp },
      { type: "static", title: "Employees Wise Gantt Charts", icon: BarChart },
      { type: "static", title: "Project Wise Gantt Charts", icon: BarChart },
      { type: "static", title: "File Nos", icon: FileDigit },
    ],
  },
  {
    type: "group",
    title: "Meeting and Visits",
    icon: Calendar,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "Site Visits", icon: HardHat },
      { type: "static", title: "Minutes of Meeting", icon: Clock },
      { type: "static", title: "Visits", icon: MapPin },
    ],
  },
  {
    type: "group",
    title: "KDPL Guide Book",
    icon: BookOpen,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "SOP's", icon: BookOpen },
      { type: "static", title: "Circulars", icon: ScrollText },
      { type: "static", title: "Notices", icon: Bell },
    ],
  },
  {
    type: "group",
    title: "Govt. Guide Book",
    icon: Landmark,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    children: [
      { type: "static", title: "Circulars", icon: ScrollText },
      { type: "static", title: "Notices", icon: Bell },
    ],
  },
  {
    type: "group",
    title: "System Administration",
    icon: Settings,
    permission: PERMISSIONS.VIEW_USERS,
    children: [
      { type: "static", title: "Roles", icon: Shield },
      {
        title: "Users",
        href: "/users",
        icon: Users,
        permission: PERMISSIONS.VIEW_USERS,
      },
    ],
  },
];
