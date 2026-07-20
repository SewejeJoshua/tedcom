import {
  ParticipantTile,
  type TrackReferenceOrPlaceholder,
} from "@livekit/components-react";

interface ParticipantTileProps {
  trackRef: TrackReferenceOrPlaceholder;
}

export default function ParticipantTileView({
  trackRef,
}: ParticipantTileProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-900">
      <ParticipantTile trackRef={trackRef} />
    </div>
  );
}