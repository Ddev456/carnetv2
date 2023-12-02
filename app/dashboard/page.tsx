import { Layout } from "@/components/layout/layout";
import { NotAuthenticatedCard } from "@/features/errors/NotAuthentificatedCard";
import { getRequiredAuthSession } from "@/lib/auth";
import { Dashboard } from "./Dashboard";

export default async function DashboardPage() {
  const { user } = await getRequiredAuthSession();

  if (!user) {
    return <NotAuthenticatedCard />;
  }

  return <Dashboard />;
}
