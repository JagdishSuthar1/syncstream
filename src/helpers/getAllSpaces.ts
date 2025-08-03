"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { join } from "path";
import CheckAuthenticated from "./checkAuthenticated";
import { SpaceType } from "@/context";
import { AllSpaceType } from "@/types/allTypes";



export default async function getAllSpaces() : Promise<AllSpaceType> {

  const response = await CheckAuthenticated()
  if (response.success == true && response.data != null) {

    const data = await prisma.space.findMany({
      where: {
        OR: [
          { creatorId: response.data.id },
          {
            activeUsers: {
              some: {
                id: response.data.id
              }
            }
          }

        ]
      },
      include: {
        activeStreams: true,
        activeUsers: true
      }

    });


    let mySpaces = [];
    let joinedSpaces = []


    for (let i = 0; i < data.length; i++) {



      if (data[i].activeStreams.length > 0) {

        const newDocument = {

          id: data[i].id,
          name: data[i].name,
          creatorId: data[i].creatorId,
          spaceCode: data[i].spacecode,
          link: data[i].link,
          title: data[i].activeStreams[0].title,
          thumbnailURL: data[i].activeStreams[0].thumbnailURL,
          activeUsers: data[i].activeUsers
        };

        if (data[i].creatorId == response.data.id) {
          mySpaces.push(newDocument);

        }
        else {
          joinedSpaces.push(newDocument)
        }

      } else {

        const newDocument = {
          id: data[i].id,
          name: data[i].name,
          creatorId: data[i].creatorId,
          spaceCode: data[i].spacecode,
          link: data[i].link,
          title: "",
          thumbnailURL: "",
          activeUsers: data[i].activeUsers
        };

        if (data[i].creatorId == response.data.id) {
          mySpaces.push(newDocument);

        }
        else {
          joinedSpaces.push(newDocument)
        }
      }
    }


    const allSpaces = {
      mySpaces,
      joinedSpaces
    }

    //console.log("all Spaces", allSpaces)
    return {
      success: true,
      message: "All Spaces Fetched Successfully",
      data: allSpaces
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