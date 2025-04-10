import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from './ui/dialog';
import { Plus, Search, Tag, Star } from 'lucide-react';
import { useSnippetStore } from '@/store/snippetStore';

export const SnippetPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { snippets, addSnippet, recentSnippets, frequentSnippets } = useSnippetStore();

  const filteredSnippets = snippets.filter(snippet => 
    snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-80 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Snippets</h2>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {filteredSnippets.map((snippet) => (
              <Card key={snippet.id} className="p-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{snippet.content}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Tag className="h-3 w-3 mr-1" />
                      {snippet.category}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Star className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};
