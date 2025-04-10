import React, { createContext, useContext, useState } from "react";

interface Snippet {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface SnippetContextType {
  snippets: Snippet[];
  categories: string[];
  addSnippet: (snippet: Omit<Snippet, "id">) => void;
  removeSnippet: (id: string) => void;
}

const SnippetContext = createContext<SnippetContextType | null>(null);

export const SnippetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const addSnippet = (snippet: Omit<Snippet, "id">) => {
    setSnippets((prev) => [...prev, { ...snippet, id: Date.now().toString() }]);
  };

  const removeSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const categories = Array.from(new Set(snippets.map((s) => s.category)));

  return (
    <SnippetContext.Provider
      value={{ snippets, categories, addSnippet, removeSnippet }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context)
    throw new Error("useSnippets must be used within SnippetProvider");
  return context;
};
