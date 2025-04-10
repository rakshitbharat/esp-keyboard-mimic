import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
  isConnected: boolean;
  isTyping: boolean;
  typingProgress: number;
  deviceName: string | null;
  error: string | null;
}

const initialState: DeviceState = {
  isConnected: false,
  isTyping: false,
  typingProgress: 0,
  deviceName: null,
  error: null,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (!action.payload) {
        state.deviceName = null;
      }
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
      if (!action.payload) {
        state.typingProgress = 0;
      }
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.typingProgress = action.payload;
    },
    setDeviceName: (state, action: PayloadAction<string>) => {
      state.deviceName = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConnection,
  setTyping,
  updateProgress,
  setDeviceName,
  setError,
} = deviceSlice.actions;
export default deviceSlice.reducer;
