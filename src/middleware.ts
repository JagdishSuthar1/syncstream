import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req : NextRequest) {
    // const currentPath = req.nextUrl.pathname;
    // console.log("Accessing Path" , currentPath);

    // const session = await getServerSession();

    // if(!(session != null && session?.user != null)) {
    //     return NextResponse.redirect(new URL("/" , req.url));
    // }
        const token = req.cookies.get("next-auth.session-token")?.value;
        if(!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        else {
            NextResponse.next()
        }
}


export const config = {
    matcher : [
        "/dashboard/:path*",
    ]
}
