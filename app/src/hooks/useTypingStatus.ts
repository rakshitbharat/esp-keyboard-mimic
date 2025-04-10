import { useState, useEffect } from "react";
import { deviceService } from "@/services/DeviceService";

export const useTypingStatus = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleTypingStatus = (status: {
      typing: boolean;
      progress?: number;
    }) => {
      setIsTyping(status.typing);
      if (status.progress !== undefined) {
        setProgress(status.progress);
      }
    };

    window.electronAPI.onTypingStatus(handleTypingStatus);

    return () => {
      // Cleanup will be handled by electron
    };
  }, []);

  return { isTyping, progress, error };
};
