import { Metadata } from "next";

export const metadata : Metadata = {
    title : "About"
}
export default function About() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 p-5 items-center  py-10 bg-[#071919] text-white  md:text-[15px] text-[13px] ">
     
     
     <div className="w-full flex flex-col gap-5 p-5 items-center ">
     <h1 className="text-2xl">What Our Platform Gives You</h1>
     
      SyncStream is a real-time collaborative music experience built for shared
      listening. Whether you're chilling with friends, hosting a party, or
      discovering new tracks with your crew, SyncStream makes music social
      again. 
      <div>Key Features: Live Rooms with Code Access: Create or join music
      rooms using a unique code — no login required. Real-Time Control: Vote to
      skip or replay songs, manage queues collaboratively, and keep the vibe
      alive with instant updates powered by WebSockets. Interactive Polls &
      Reactions: Hosts can launch live polls and everyone can participate, vote,
      and react in the moment. Per-Track Chat: Discuss what’s playing with a
      built-in comment section for every track. Role-Based Controls: Hosts can
      moderate rooms by kicking/banning users, managing polls, and skipping
      tracks. Dynamic Queue: Songs with the most votes get played next. It’s
      your room, your rules — decided together. Responsive & Performant UI:
      Built with Next.js App Router, Tailwind CSS, and optimized for all
      devices.</div>
      

      <div className="flex justify-start">
        Built With: Next.js, TypeScript, Tailwind CSS, Node.js,
      Express, Prisma, PostgreSQL, and WebSockets.
      </div>
      
      </div> 
      
    </div>
  );
}
