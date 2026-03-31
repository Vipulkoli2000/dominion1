import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard";

export const metadata = {
  title: "Employee Dashboard - Dominion",
  description: "Track your projects and tasks performance.",
};

export default function EmployeeDashboardPage() {
  return (
    <div className="w-full">
      <EmployeeDashboard />
    </div>
  );
}
