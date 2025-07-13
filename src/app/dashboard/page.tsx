import DashboardLandingPage from "@/components/myspaces/landingPage";
import DashboardLandingSkelton from "@/components/myspaces/landingSkeleton";
import { SpaceType } from "@/context";

import getAllSpaces from "@/helpers/getAllSpaces";

import { Suspense } from "react";
import { toast, Toaster } from "sonner";



export default async function Dashboard() {
  const allSpaces = getAllSpaces();

  return (
    <div>
      <Toaster />
      <Suspense fallback={<DashboardLandingSkelton/>}>
          <DashboardLandingPage data={allSpaces} />
      </Suspense>
    </div>
  );
}
