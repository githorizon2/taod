import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Logo } from "./components/logo";
import { MultiCameraView } from "./components/multi-camera-view";
import { Particles } from "./components/particles/particles";
import { Combobox } from "./components/ui/combobox";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="relative z-10 size-full flex flex-col gap-2 items-center ">
        <Logo />
        <div className="flex-1">
          <MultiCameraView />
        </div>

        <div className="absolute top-o left-0">
          <Combobox
            mode="multiple"
            options={[{ value: "test", label: "test" }]}
            selected={"test"}
            placeholder="Select option..."
            onChange={(value) => console.log(value)}
            onCreate={() => {
              console.log("1");
            }}
          />
        </div>

        {/* <LockedSshTerminal /> */}
      </div>
      <Particles />
    </QueryClientProvider>
  );
}

export default App;
