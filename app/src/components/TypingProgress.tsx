import React from "react";
import { Progress } from "./ui/progress";
import { useTypingStatus } from "@/hooks/useTypingStatus";

export const TypingProgress: React.FC = () => {
  const { isTyping, progress } = useTypingStatus();

  if (!isTyping) return null;

  return (
    <div className="w-full space-y-2">
      <Progress value={progress} className="w-full h-2" />
      <p className="text-xs text-muted-foreground text-center">
        Typing in progress: {progress}%
      </p>
    </div>
  );
};
