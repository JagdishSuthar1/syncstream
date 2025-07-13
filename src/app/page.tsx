import KeyFeature from "@/components/landingPage/keyfeature";
import MainView from "@/components/landingPage/mainView";

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      <MainView/>
      <KeyFeature/>
    </div>
  );
}
