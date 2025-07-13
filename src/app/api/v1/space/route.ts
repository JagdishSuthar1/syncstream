// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"
// import { getServerSession } from "next-auth";


// export async function POST(req: NextRequest) {

//     const session = await getServerSession();
//     if (session != null && session.user?.email != null) {
//         try {

//             const user = await prisma.user.findFirst({
//                 where: {
//                     email: session?.user?.email
//                 }
//             })

//             if (user) {
//                 const reqBody = await req.json();
//                     const spacecode  = Math.random() * 10000;
//                     const results = await prisma.space.create({
//                         data: {
//                             creatorId: user.id,
//                             name : reqBody.name,
//                             spacecode : spacecode
//                         }
//                     })

//                     return NextResponse.json({
//                         success: true,
//                         message: "Space Created Successfully",
//                         data: results
//                     })

//             }

//             else {
//                 return NextResponse.json({
//                     success: false,
//                     message: "Unauthorised access"
//                 })

//             }
//         }
//         catch (err) {
//             console.log(err);
//             return NextResponse.json({
//                 success: false,
//                 message: "Error in Request"
//             })
//         }
//     }

//     else {
//         return NextResponse.json({
//             success: false,
//             message: "Sign in first"
//         })
//     }

// }



