import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { VideoStream } from "@/components/video-stream";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="size-full flex flex-col gap-2 items-center ">
        <Avatar className="h-28 w-72">
          <AvatarImage src="/logo.png" height={30} alt="@toad" />
          <AvatarFallback>Toad</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <VideoStream device={0} />
        </div>

        {/* <LockedSshTerminal /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
