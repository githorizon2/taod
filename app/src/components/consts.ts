import type { StreamingState } from "./types";

export const VIDEO_ID = "video";
export const STREAM_SLEEPING_INDICATION_SEC = 2;
export const STREAM_OFF_INDICATION_SEC = 30;
export const CHECK_STREAM_TIMER_MS = 1500;

export const videoStateIndicator: Record<StreamingState, string> = {
  on: "green",
  resumed: "gray",
  paused: "gray",
  sleep: "orange",
  off: "red",
};
