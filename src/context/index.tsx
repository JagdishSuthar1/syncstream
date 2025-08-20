"use client"
import { PollStreamType } from "@/types/allTypes";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";


type MainContextType = {
    allSpaces: SpaceType[] | null,
    setAllspaces: Dispatch<SetStateAction<SpaceType[] | null>>
    ,
    allStreams: StreamType[] | null,
    setAllStream: Dispatch<SetStateAction<StreamType[] | null>>,
    fetchAgain: boolean
    , setFetchAgain: Dispatch<SetStateAction<boolean>>,
    fetchSpacesAgain: boolean
    , setFetchSpacesAgain: Dispatch<SetStateAction<boolean>>,
    spaceSelected: SpaceType | null
    , setSpaceSelected: Dispatch<SetStateAction<SpaceType | null>>,
    commentSocket: WebSocket | null
    , setCommentSocket: Dispatch<SetStateAction<WebSocket | null>>,
    comments: CommentType[] | null
    , setComments: Dispatch<SetStateAction<CommentType[] | null>>,
    kicked: boolean,
    setKicked: Dispatch<SetStateAction<boolean>>,
    activePolls: (PollStreamType & {
        id: number;
    })[] | null
    , setActivePolls: Dispatch<SetStateAction<(PollStreamType & {
        id: number;
    })[] | null>>,
    currentPollDetails: (PollStreamType & {
        id: number;
    }) | null
    , setCurrentPollDetails: Dispatch<SetStateAction<(PollStreamType & {
        id: number;
    }) | null>>,
    colorsStates: ColorType
    , setColorStates: Dispatch<SetStateAction<ColorType>>,
    typography : TypoGraphy
    , setTypoGraphy : Dispatch<SetStateAction<TypoGraphy>>,
    activeUsers : ActiveUsersType[] | undefined
    , setActiveUsers : Dispatch<SetStateAction<ActiveUsersType[] | undefined>>,
    pollResultShow  : boolean
    , setPollResultShow : Dispatch<SetStateAction<boolean>>
 
}


export const MainContext = createContext<MainContextType | null>(null);


export type UserType = {
    id: number,
    email: string
}


type LandingColorType = {
    background: string,
    button: string,
    keyFeatures: string,
    header_button: string
}


type StreamColorType = {
    background: string,
    button: string,
    streamPlaying: string,
    streamBox: string,
    upvote_downVote: string,
    comment: string,
    message: string,
    createNewStream: string,
    link : string,
    streamHeader : string
}

type DashboardColorType = {
    background: string,
    button: string,
    JoinSpace: string,
    mySpaces: string,
    link_delete_button: string,
}

type ColorType = {
    landingPage: LandingColorType,
    dashaboardPage: DashboardColorType,
    streamPage: StreamColorType
}



type TypoGraphy = {
    landingPage: string,
    dashaboardPage: string,
    streamPage: string
}



export type StreamType = {
    id: number,
    type: string,
    url: string,
    upvote: number,
    downvote: number,
    spaceId: Number
    title: string,
    thumbnailURL: string
}



export type SpaceType = {
  id: number;
  name: string;
  creatorId: number;
  spaceCode: number;
  currentStream: {
    link: string;
    title: string;
    thumbnailURL: string;
  } | null;
};



export type CommentType = {
    id: number,
    spaceId: number,
    user: UserType,
    message: string
}

type ActiveUsersType = {
    userId: number,
    socketId: WebSocket,
    email : string
}


export default function MainContextProvider({ children }: { children: ReactNode }) {
    const [allSpaces, setAllspaces] = useState<SpaceType[] | null>(null);
    const [allStreams, setAllStream] = useState<StreamType[] | null>(null);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const [fetchSpacesAgain, setFetchSpacesAgain] = useState<boolean>(true);
    const [spaceSelected, setSpaceSelected] = useState<SpaceType | null>(null);
    const [commentSocket, setCommentSocket] = useState<WebSocket | null>(null);
    const [comments, setComments] = useState<CommentType[] | null>(null)
    const [kicked, setKicked] = useState<boolean>(false);

    const [activeUsers, setActiveUsers] = useState<ActiveUsersType[]>()
    const [activePolls, setActivePolls] = useState<(PollStreamType & { id: number })[] | null>(null);
    const [currentPollDetails, setCurrentPollDetails] = useState<PollStreamType & { id: number } | null>(null);
    const [colorsStates, setColorStates] = useState<ColorType>({
        landingPage: {
            background: "#0a0a0a",
            button: "#e80082",
            keyFeatures: "#ff69b4",
            header_button: "#e80082"
        },
        dashaboardPage: {
            background: "#071919",
            button: "#e80082",
            JoinSpace: "#ff69b4",
            mySpaces: "#e80082",
            link_delete_button: "#e80082"
        },
        streamPage: {
            background: "#071919",
            button: "#CC6CE7",
            streamPlaying: "#c71585",
            streamBox: "#1a1a1a",
            upvote_downVote: "#ff69b4",
            comment: "#2a2a2a",
            message: "#4a4a4a",
            link: "#e80082",
            createNewStream: "#ff007f",
            streamHeader : "#e80082"
        }
        
        
    })
    
    const [pollResultShow , setPollResultShow]  = useState<boolean>(false);

    const [typography, setTypoGraphy] =  useState<TypoGraphy> ({
        landingPage : "",
        dashaboardPage : "",
        streamPage : ""
    })


    return (
        <MainContext.Provider value={{
            allSpaces, setAllspaces,
            allStreams, setAllStream,
            fetchAgain, setFetchAgain,
            fetchSpacesAgain, setFetchSpacesAgain,
            spaceSelected, setSpaceSelected,
            commentSocket, setCommentSocket,
            comments, setComments,
            kicked, setKicked,
            activePolls, setActivePolls,
            currentPollDetails, setCurrentPollDetails,
            colorsStates, setColorStates,
            typography, setTypoGraphy,
            activeUsers, setActiveUsers,
            pollResultShow , setPollResultShow
        }}>{children}</MainContext.Provider>
    )
}
