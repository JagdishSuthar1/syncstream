import ReactPlayer from "react-player"

export function VideoPlayer({videoURL} : {videoURL : string}) {
    return (
        <div className="player-wrapper w-full h-full">
        <ReactPlayer
        url={videoURL}
        className={"react-player"}
        controls
        width={"100%"}
        height={"100%"}
        />
        </div>
    )
}