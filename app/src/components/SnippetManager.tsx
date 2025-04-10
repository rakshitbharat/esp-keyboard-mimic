import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Search, Tag, Star, Clock } from "lucide-react";
import { useSnippetStore } from "@/store/snippetStore";
import { CreateSnippetDialog } from "./dialogs/CreateSnippetDialog";
import { SnippetItem } from "./snippets/SnippetItem";

interface Snippet {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface SnippetState {
  snippets: Snippet[];
  categories: string[];
  addSnippet: (snippet: Omit<Snippet, "id">) => void;
  removeSnippet: (id: string) => void;
}

export const SnippetManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { snippets, categories } = useSnippetStore() as unknown as SnippetState;

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Snippets</h2>
        <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          New Snippet
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search snippets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="frequent">
                <Star className="w-4 h-4 mr-1" />
                Frequent
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="w-4 h-4 mr-1" />
                Recent
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px]">
              <TabsContent value="all" className="space-y-2">
                {snippets.map((snippet) => (
                  <SnippetItem
                    key={snippet.id}
                    id={snippet.id}
                    title={snippet.title}
                    content={snippet.content}
                  />
                ))}
              </TabsContent>

              {/* Similar TabsContent for frequent and recent */}
            </ScrollArea>
          </Tabs>
        </div>
      </CardContent>

      <CreateSnippetDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </Card>
  );
};
