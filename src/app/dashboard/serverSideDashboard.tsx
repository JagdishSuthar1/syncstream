import DashboardLandingPage from "@/components/myspaces/landingPage";
import DashboardLandingSkelton from "@/components/myspaces/landingSkeleton";
import getAllSpaces from "@/helpers/getAllSpaces";
import { Suspense } from "react";

export default async function DashboardPage() {
  const allSpaces = await getAllSpaces();

  return (
    <div>
          <DashboardLandingPage data={allSpaces} />
          {/* <DashboardLandingSkelton/> */}
    </div>
  );
}
