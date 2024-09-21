import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PasswordDialog } from "./password-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommandOutput, sendCommand } from "@/lib/api";

export function LockedSshTerminal() {
  const [currentCommand, setCurrentCommand] = useState<string>("");

  const [isLocked, setIsLocked] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [pendingCommand, setPendingCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    mutate,
    data: output,
    isPending,
  } = useMutation<CommandOutput>({
    mutationFn: async () => {
      return sendCommand(pendingCommand);
    },
  });

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = e.currentTarget.value;
      if (isLocked) {
        console.log("locked");

        setPendingCommand(command);
        setShowPasswordDialog(true);
      } else {
        executeCommand(command);
      }
      e.currentTarget.value = "";
    }
  };

  const handlePasswordSubmit = (value: string) => {
    if (value === "password123") {
      setIsLocked(false);
      setShowPasswordDialog(false);
      setCurrentCommand(pendingCommand);
      mutate();
      setPendingCommand("");
    } else {
      toast.error("Incorrect password. Access denied.");
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-900 text-green-400 font-mono rounded-lg shadow-lg">
      <ScrollArea className="h-40 mb-4 overflow-hidden" ref={scrollAreaRef}>
        <AnimatePresence mode="wait">
          {currentCommand && (
            <motion.div
              key={currentCommand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex mb-2">
                <span className="text-blue-400 mr-2">user@ssh-server:~$</span>
                <span>{currentCommand}</span>
              </div>
              {isPending ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="animate-spin h-5 w-5 text-green-400" />
                </motion.div>
              ) : (
                <motion.pre
                  className="whitespace-pre-wrap text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {output?.result}
                </motion.pre>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-blue-400 mr-2">user@ssh-server:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent outline-none"
          onKeyDown={handleCommand}
          placeholder="Enter SSH command..."
          aria-label="SSH command input"
          disabled={isPending}
        />
        {isLocked && <Lock className="h-5 w-5 text-yellow-500 ml-2" />}
      </motion.div>

      <PasswordDialog
        onSubmit={handlePasswordSubmit}
        show={showPasswordDialog}
        setShow={setShowPasswordDialog}
      />
    </div>
  );
}
