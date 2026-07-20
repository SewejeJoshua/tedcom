import {
  ControlBar,
  DisconnectButton, 
} from "@livekit/components-react";
// import { Track } from "livekit-client";

interface VideoToolbarProps {
  onLeave?: () => void;
}

export default function VideoToolbar({
  onLeave,
}: VideoToolbarProps) {
  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">
      <div className="flex justify-center">
        <ControlBar
          controls={{
            microphone: true,
            camera: true,
            screenShare: true,
            chat: false,
            leave: false,
          }}
          variation="minimal"
        />

        <DisconnectButton
          onClick={onLeave}
          className="ml-4 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Leave
        </DisconnectButton>
      </div>
    </div>
  );
}