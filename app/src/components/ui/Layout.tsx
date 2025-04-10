import React from "react";
import { FloatingWindow } from "../FloatingWindow";
import { useDeviceStore } from "@/store/deviceStore";

export const Layout = () => {
  const [text, setText] = React.useState("");
  const { isConnected, connect } = useDeviceStore();

  return (
    <div className="min-h-screen">
      <FloatingWindow
        isConnected={isConnected}
        text={text}
        onTextChange={setText}
        onConnect={connect}
        onType={() => {}}
        onClear={() => setText("")}
      />
    </div>
  );
};
