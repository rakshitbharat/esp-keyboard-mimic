import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Snippet {
  id: string;
  content: string;
  category: string;
  usageCount: number;
  lastUsed: Date;
}

interface SnippetState {
  snippets: Snippet[];
  recentSnippets: Snippet[];
  frequentSnippets: Snippet[];
  addSnippet: (snippet: Omit<Snippet, 'id' | 'usageCount' | 'lastUsed'>) => void;
  useSnippet: (id: string) => void;
  removeSnippet: (id: string) => void;
}

export const useSnippetStore = create<SnippetState>()(
  persist(
    (set, get) => ({
      snippets: [],
      recentSnippets: [],
      frequentSnippets: [],
      addSnippet: (snippetData) => {
        const newSnippet = {
          ...snippetData,
          id: crypto.randomUUID(),
          usageCount: 0,
          lastUsed: new Date(),
        };
        set((state) => ({
          snippets: [...state.snippets, newSnippet],
        }));
      },
      useSnippet: (id) => {
        set((state) => {
          const snippet = state.snippets.find((s) => s.id === id);
          if (!snippet) return state;

          const updatedSnippets = state.snippets.map((s) =>
            s.id === id
              ? { ...s, usageCount: s.usageCount + 1, lastUsed: new Date() }
              : s
          );

          return {
            snippets: updatedSnippets,
            recentSnippets: updatedSnippets
              .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
              .slice(0, 10),
            frequentSnippets: updatedSnippets
              .sort((a, b) => b.usageCount - a.usageCount)
              .slice(0, 10),
          };
        });
      },
      removeSnippet: (id) => {
        set((state) => ({
          snippets: state.snippets.filter((s) => s.id !== id),
        }));
      },
    }),
    {
      name: 'snippet-storage',
    }
  )
);
