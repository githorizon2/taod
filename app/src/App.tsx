import { LockedSshTerminal } from "@/components/locked-ssh-terminal";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VideoStream } from "./components/video-stream";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="size-full flex flex-col gap-2 items-center">
        <div className="flex-1">
          <VideoStream device={0} />
        </div>
        <div>
          <LockedSshTerminal />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
