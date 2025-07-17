import DashboardLandingPage from "@/components/myspaces/landingPage";
import DashboardLandingSkelton from "@/components/myspaces/landingSkeleton";
import { SpaceType } from "@/context";

import getAllSpaces from "@/helpers/getAllSpaces";

import { Suspense } from "react";
import { toast, Toaster } from "sonner";
import DashboardPage from "./serverSideDashboard";



export default async function Dashboard() {
  return (
    <div>
      <Toaster />
      <Suspense fallback={<DashboardLandingSkelton/>}>
          <DashboardPage />
      </Suspense>
    </div>
  );
}
