import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { confetti } from "@tsparticles/confetti";
import { confettiConfiguration } from "@/components/confetti";
export const Logo = () => {
  const handleClick = () => {
    confetti(confettiConfiguration);
  };

  return (
    <Avatar className="h-28 w-72" onDoubleClick={handleClick}>
      <AvatarImage src="/logo.png" height={30} alt="@toad" />
      <AvatarFallback>Toad</AvatarFallback>
    </Avatar>
  );
};
