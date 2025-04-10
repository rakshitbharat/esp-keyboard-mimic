import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  categories: string[];
}

const initialState: SnippetState = {
  snippets: [],
  recentSnippets: [],
  frequentSnippets: [],
  categories: [],
};

export const snippetSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    addSnippet: (
      state,
      action: PayloadAction<Omit<Snippet, "usageCount" | "lastUsed">>
    ) => {
      const newSnippet = {
        ...action.payload,
        usageCount: 0,
        lastUsed: new Date(),
      };
      state.snippets.push(newSnippet);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
    useSnippet: (state, action: PayloadAction<string>) => {
      const snippet = state.snippets.find((s) => s.id === action.payload);
      if (snippet) {
        snippet.usageCount += 1;
        snippet.lastUsed = new Date();
        updateRecentAndFrequent(state);
      }
    },
  },
});

function updateRecentAndFrequent(state: SnippetState) {
  state.recentSnippets = [...state.snippets]
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, 10);

  state.frequentSnippets = [...state.snippets]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10);
}

export const { addSnippet, useSnippet } = snippetSlice.actions;
export default snippetSlice.reducer;
