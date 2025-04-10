import React from "react";
import { Button } from "../ui/button";
import { Trash2, Type } from "lucide-react";

interface SnippetItemProps {
  id: string;
  title: string;
  content: string;
  onType: () => void;
  onDelete: () => void;
}

export const SnippetItem: React.FC<SnippetItemProps> = ({
  title,
  content,
  onType,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded-lg mb-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={onType}>
            <Type className="h-4 w-4 mr-1" />
            Type
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
};
