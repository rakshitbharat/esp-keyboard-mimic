import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useTypingStatus } from "@/hooks/useTypingStatus";
import { TypingProgress } from "./TypingProgress";
import { Tooltip } from "./ui/tooltip";
import { Bluetooth, Type, Trash2, GripHorizontal } from "lucide-react";

interface FloatingWindowProps {
  isConnected: boolean;
  text: string;
  onConnect: () => void;
  onTextChange: (text: string) => void;
  onType: () => void;
  onClear: () => void;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = ({
  isConnected,
  text,
  onConnect,
  onTextChange,
  onType,
  onClear,
}) => {
  const { isTyping, progress } = useTypingStatus();

  return (
    <Card className="floating-window min-w-[300px] shadow-lg">
      <div className="flex items-center justify-between p-4">
        <GripHorizontal className="w-6 h-6 text-muted-foreground cursor-move" />
        <h1 className="text-lg font-semibold">ESP Keyboard Mimic</h1>
        <Tooltip content={isConnected ? "Connected" : "Click to connect"}>
          <Button
            size="icon"
            variant={isConnected ? "default" : "outline"}
            onClick={onConnect}
          >
            <Bluetooth
              className={isConnected ? "text-green-500" : "text-red-500"}
            />
          </Button>
        </Tooltip>
      </div>

      <div className="p-4 space-y-4">
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text to type..."
          disabled={isTyping}
          className="min-h-[100px] resize-none"
        />

        {isTyping && <TypingProgress />}

        <div className="flex justify-between gap-2">
          <Button
            className="flex-1"
            onClick={onType}
            disabled={!isConnected || !text.trim() || isTyping}
          >
            <Type className="mr-2 h-4 w-4" />
            {isTyping ? "Typing..." : "Type Text"}
          </Button>

          <Button variant="destructive" onClick={onClear} disabled={isTyping}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
