import { create } from 'zustand';

export const useRoomStore = create((set) => ({
  rooms: [],
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
}));
