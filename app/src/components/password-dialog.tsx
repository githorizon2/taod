import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { type FC, useState } from "react";
import { Button } from "./ui/button";

interface PasswordDialogProps {
  show: boolean;
  setShow: (value: boolean) => void;
  onSubmit: (value: string) => void;
}

export const PasswordDialog: FC<PasswordDialogProps> = ({
  setShow,
  show,
  onSubmit,
}) => {
  const [password, setPassword] = useState("");
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            Please enter the password to unlock the terminal and execute the
            command.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSubmit(password)}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
