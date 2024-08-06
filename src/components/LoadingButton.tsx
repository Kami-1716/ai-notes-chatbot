import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  text: string;
  disabled: boolean;
};

const LoadingButton = ({ text, disabled }: Props) => {
  return (
    <Button disabled={disabled} className="w-full">
      <Loader2 size={20} className="mr-2  animate-spin text-muted-foreground" />
      {text}
    </Button>
  );
};

export default LoadingButton;
