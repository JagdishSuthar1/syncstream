import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers : [
        GoogleProvider(
            {
                clientId : process.env.GOOGLE_CLIENT_ID as string,
                clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
            }
        )
    ]
    ,
    secret : process.env.NEXTAUTH_SECRET,
    trueHost : true,
    callbacks : {
        async signIn(params) {
            try {
                await prisma.user.create({
                    data : {
                        email : params.user.email!,
                        provider : "Google",
                        role : "EndUser"
                    }
                })
            }
            catch(err) {
                console.log(err)
            }
            return true
        }
    }
    ,
    pages : {
        signOut :"/",
        // signIn : 
    }

})


export {handler as GET , handler as POST}
