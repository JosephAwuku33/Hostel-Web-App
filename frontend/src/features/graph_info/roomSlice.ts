import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Room {
  id: string;
  number: string;
  status: string;
  gender_type: string;
  price: number;
  occupants: number;
}

interface RoomState {
  data: Room[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  data: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Room[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = roomSlice.actions;
export const selectRooms = (state: { rooms: RoomState }) => state.rooms;
export default roomSlice.reducer;
