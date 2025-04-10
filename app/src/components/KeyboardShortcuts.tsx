import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Keyboard, Plus } from "lucide-react";
import { useHotkeys } from "@/hooks/useHotkeys";

export const KeyboardShortcuts = () => {
  const { shortcuts, addShortcut, removeShortcut } = useHotkeys();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Keyboard className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Shortcut
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{shortcut.name}</p>
              <p className="text-sm text-muted-foreground">
                {shortcut.description}
              </p>
            </div>
            <Input
              value={shortcut.keys}
              className="w-40 text-center font-mono"
              readOnly
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
