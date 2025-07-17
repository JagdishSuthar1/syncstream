import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AllProviders from "@/providers";
import Header from "@/components/landing/header";


export const metadata: Metadata = {
  title: {
    default :  "SyncStream",
    template : "%s - SyncStream"
  },
  description: "Play the song Which Space Likes",

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="dark:bg-amber-700"
      >
        {/* <NextThemeProvider> */}
        <AllProviders>
          <Header/>
          {children}
        </AllProviders>
          {/* </NextThemeProvider> */}
        
      </body>
    </html>
  );
}
