import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Search, Star, Clock, Tags } from "lucide-react";
import { useSnippetStore } from "@/store/snippetStore";

export const SnippetManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { snippets, addSnippet, recentSnippets, frequentSnippets } =
    useSnippetStore();

  return (
    <Card className="w-80 h-[500px] p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Snippets</h2>
        <Button size="icon" variant="ghost">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search snippets..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="frequent">
            <Star className="h-4 w-4 mr-1" />
            Frequent
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="h-4 w-4 mr-1" />
            Recent
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[350px]">
          {/* Snippet list rendering goes here */}
        </ScrollArea>
      </Tabs>
    </Card>
  );
};
