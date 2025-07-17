import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/hero";
import KeyFeature from "@/components/landing/keyfeature";
import LogoMover from "@/components/landing/logoMover";
import WebPages from "@/components/landing/webpages";

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      <Hero/>
      <LogoMover/>
      <KeyFeature/>
      <WebPages/>
      <Footer/>
    </div>
  );
}
