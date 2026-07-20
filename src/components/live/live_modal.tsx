import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";

interface LiveModalProps {
  token: string;
  serverUrl: string;
  roomName?: string;
  onClose: () => void;
}

export default function LiveModal({
  token,
  serverUrl,
  onClose,
}: LiveModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg z-10"
        >
          Close
        </button>

        <LiveKitRoom
          serverUrl={serverUrl}
          token={token}
          connect={true}
          video={true}
          audio={true}
        >
          <VideoConference />
        </LiveKitRoom>

      </div>
    </div>
  );
}