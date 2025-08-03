import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function CheckAuthenticated() {


     const session = await getServerSession();
            //console.log(session)
            if (session != null && session.user?.email != null) {
                try {
        
                    const user = await prisma.user.findFirst({
                        where: {
                            email: session?.user?.email
                        }
                    })
        
        
                    if (user) {
                  
                        return {    
                            success : true,
                            message : "Authenticated",
                            data : user
                        }
                       
                    }
    
        
                    else {
                        return {
                            success: false,
                            message: "Unauthorised access",
                            data : null
                        }
        
                    }
        
                }
                catch (err) {
                    //console.log(err);
                    return{
                        success: false,
                        message: "Error in Request",
                        data : null
                    }
                }
            }
        
            else {
                return{
                    success: false,
                    message: "Sign in first",
                    data : null
                }
            }
     
    
}