import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";

interface VideoRoomProps {
  token: string;
  serverUrl: string;
  onLeave: () => void;
}

export default function VideoRoom({
  token,
  serverUrl,
  onLeave,
}: VideoRoomProps) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
      onDisconnected={onLeave}
      className="h-full w-full bg-black"
    >
      <VideoConference />

      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}