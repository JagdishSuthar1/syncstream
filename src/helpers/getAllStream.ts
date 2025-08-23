"use server";
import { SpaceType, StreamType, UserType } from "@/context";
import { prisma } from "@/lib/prisma";
import BannedOrNot from "./bannedOrNot";

type DataProps = {
  success: boolean;
  message: string;
  userInfo : UserType,
  data: {
    currentStream: StreamType;
    allStream: StreamType[];
    currentSpace: {
    id: number;
    creatorId: number;
    link: string;
    name: string;
    spaceCode: number;
    activeUsers: {
        id: number;
        email: string;
        provider: string;
        role: string;
    }[];
},
    comments: {
      id: number;
      spaceId: number;
      user: UserType;
      message: string;
    }[]
    fetchAgain: boolean;
  } | null;
};


// function convertToNoCookieEmbed(url: string): string {
//   const match = url.match(/v=([^&]+)/);
//   return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
// }

export default async function getAllStream(
  spaceId: number
): Promise<DataProps> {
  //console.log(spaceId);
  // const results = await axiosInstance.get(`/api/v1/space/${spaceId}`);

  const response = await BannedOrNot(spaceId);

  if (response.success == false && response.message == "NOT_BANNED" && response.data != null) {
    const results = await prisma.space.update({
      where: {
        id: spaceId
      },

      data: {
        activeUsers: {
          connect: {
            id: response.data.id
          }
        }
      }
      ,
      include: {
        stream : {
           include: {
              votes: true
          }
        },
        activeUsers: true,
        activeStreams: {
          include: {
            votes: true
          }
        },
        comments: {
          include: {
            user: true
          }
        }
      }
      
    })


    // //console.log(results.comments);

    let dummy = [];
    let currentSpace  = {
      id: results.id,
      creatorId: results.creatorId,
      link: results.link,
      name: results.name,
      spaceCode: results.spacecode,
      activeUsers: results.activeUsers,
    }

    let currentStream : StreamType;

    let upvoteCount = 0;
    let downVoteCount = 0;

    for (let i = 0; i < results.activeStreams.length; i++) {
      upvoteCount = 0;
      downVoteCount = 0;
      for (let j = 0; j < results.activeStreams[i].votes.length; j++) {
        if (results.activeStreams[i].votes[j].type == "Upvote") {
          upvoteCount = upvoteCount + 1;
        } else {
          downVoteCount = downVoteCount + 1;
        }
      }
      
      
      

      const newDocument = {
        id: results.activeStreams[i].id,
        type: results.activeStreams[i].type,
        url: results.activeStreams[i].url,
        upvote: upvoteCount,
        downvote: downVoteCount,
        spaceId: results.activeStreams[i].spaceId,
        title: results.activeStreams[i].title,
        thumbnailURL: results.activeStreams[i].thumbnailURL,
      };

      if(results.stream != null && results.activeStreams[i].id == results.stream.id) {
        currentStream = newDocument;
      }
      dummy.push(newDocument);
    }


    dummy.sort((a, b) => {
      return b.upvote - a.upvote;
    });


    return {
      success: true,
      message: "Data Fetched Successfully",
      userInfo : response.data,
      data: {
        currentStream: currentStream!,
        allStream: dummy,
        currentSpace,
        comments: results.comments,
        fetchAgain: false,
      },
    };

  }
  else {
    return {
      success: false,
      message: "banned",
      userInfo : response.data,
      data : null
    }
  }

}


