import { Toaster } from "@/components/ui/sonner";
import { VideoStream } from "@/components/video-stream";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Logo } from "./components/logo";
import { Particles } from "./components/particles/particles";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="relative z-10 size-full flex flex-col gap-2 items-center ">
        <Logo />
        <div className="flex-1">
          <VideoStream device={0} />
        </div>

        {/* <LockedSshTerminal /> */}
      </div>
      <Particles />
    </QueryClientProvider>
  );
}

export default App;
