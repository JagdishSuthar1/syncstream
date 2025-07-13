import Header from "@/components/ui/header";
import MainContextProvider from "@/context";
import AllProviders from "@/providers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">

        <AllProviders>
            <MainContextProvider>
          {children}
          </MainContextProvider>
        </AllProviders>
        
      </div>
  );
}
