import { MainContext } from "@/context";
import { useContext, useRef } from "react";
import ReactPlayer from "react-player";

export function VideoPlayer({
    videoURL,
    impData,
}: {
    videoURL: string;
    impData: { spaceId: number };
}) {
    const { commentSocket } = useContext(MainContext)!;
    const playerRef = useRef<ReactPlayer>(null);

    const getCurrentTime = () => playerRef.current?.getCurrentTime() ?? 0;

    return (
        <div className="player-wrapper w-full h-full">
            <ReactPlayer
                ref={playerRef}
                url={videoURL}
                className="react-player"
                controls
                width="100%"
                height="100%"
                light={true}
                onPlay={() =>
                    commentSocket?.send(
                        JSON.stringify({
                            type: "PLAY_STREAM",
                            payload: {
                                spaceId: impData.spaceId,
                                time: getCurrentTime(),
                            },
                        })
                    )
                }
                onPause={() =>
                    commentSocket?.send(
                        JSON.stringify({
                            type: "PAUSE_STREAM",
                            payload: {
                                spaceId: impData.spaceId,
                                time: getCurrentTime(),
                            },
                        })
                    )
                }
                onSeek={(seconds: number) =>
                    commentSocket?.send(
                        JSON.stringify({
                            type: "SYNC_STREAM",
                            payload: {
                                spaceId: impData.spaceId,
                                time: seconds,
                            },
                        })
                    )
                }
            />
        </div>
    );
}
