import { ReactNode } from "react";
import NextAuthProvider from "./next-auth-provider";
import MainContextProvider from "@/context";


export default function AllProviders({children} : {children : ReactNode}) {
    return (
                  <NextAuthProvider>
                    <MainContextProvider>
                  {children}
                  </MainContextProvider>
                  </NextAuthProvider>
    )
}