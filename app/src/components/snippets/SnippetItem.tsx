import React from "react";
import { Button } from "../ui/button";
import { Trash2, Type } from "lucide-react";

interface SnippetItemProps {
  id: string;
  title: string;
  content: string;
  onDelete?: () => void;
  onType?: () => void;
}

export const SnippetItem: React.FC<SnippetItemProps> = ({
  title,
  content,
  onDelete,
  onType,
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{title}</h3>
        <div className="space-x-2">
          <Button size="sm" onClick={onType}>
            <Type className="w-4 h-4 mr-1" />
            Type
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
};
