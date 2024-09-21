import { Skeleton } from "@/components/ui/skeleton";
import { type FC, useCallback, useEffect, useState } from "react";
import useInterval from "react-useinterval";
import {
  CHECK_STREAM_TIMER_MS,
  STREAM_OFF_INDICATION_SEC,
  STREAM_SLEEPING_INDICATION_SEC,
  VIDEO_ID,
  videoStateIndicator,
} from "./consts";
import { WHEPClient } from "./media-mtx-webrtc";
import type { StreamingState } from "./types";
import { cn } from "@/lib/utils";

const videoURL = "http://localhost:8889";

interface VideoStreamProps {
  device: number;
}

export const VideoStream: FC<VideoStreamProps> = ({
  device,
}: VideoStreamProps) => {
  const [, setStreamingClient] = useState<WHEPClient>();
  const [streamingState, setStreamingState] = useState<StreamingState>("off");
  const [latestFrameReceivedTime, setLatestFrameReceivedTime] = useState(
    new Date()
  );
  const [firstFrameReceived, setFirstFrameReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setStreamingState("off");
    setFirstFrameReceived(false);
    setIsLoading(true);
    setIsPlaying(false);

    if (videoURL) {
      const videoElement = document.getElementById(`${VIDEO_ID}-${device}`);
      setStreamingClient(
        new WHEPClient(videoElement, videoURL, "test", window)
      );
    }
  }, [device]);

  useInterval(
    () => {
      if (streamingState !== "off") {
        const currentDate = new Date();
        const differenceInSeconds =
          (currentDate.getTime() - latestFrameReceivedTime.getTime()) / 1000;

        if (differenceInSeconds > STREAM_OFF_INDICATION_SEC) {
          setStreamingState("off");
        } else if (differenceInSeconds > STREAM_SLEEPING_INDICATION_SEC) {
          setStreamingState("sleep");
        }
      }
    },
    streamingState !== "off" && streamingState !== "paused"
      ? CHECK_STREAM_TIMER_MS
      : null
  );

  const onStreamMessageReceived = useCallback(() => {
    if (!firstFrameReceived) {
      setFirstFrameReceived(true);
      setIsLoading(false);
      return;
    }

    if (streamingState !== "on") setStreamingState("on");
    setLatestFrameReceivedTime(new Date());
  }, [streamingState, firstFrameReceived]);

  return (
    <div
      className={cn(
        "aspect-video border-8 transition-colors duration-300 h-full w-full rounded-xl",
        streamingState === "on" ? "border-green-500" : "border-red-500"
      )}
    >
      {(isLoading || !isPlaying) && (
        <Skeleton className="size-full rounded-xl" />
      )}

      <video
        id={`${VIDEO_ID}-${device}`}
        className="rounded-md size-full"
        controls={false}
        muted
        autoPlay
        onError={() => setStreamingState("off")}
        onPause={() => {
          setStreamingState("paused");
          setIsPlaying(false);
        }}
        onPlay={() => {
          setStreamingState("resumed");
          setIsPlaying(true);
        }}
        onTimeUpdateCapture={() =>
          streamingState !== "paused" && onStreamMessageReceived()
        }
      />
    </div>
  );
};
