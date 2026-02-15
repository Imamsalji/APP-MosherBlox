import { create } from "zustand";

type AppState = {
  cart: number;
  setCart: (val: number) => void;
};


export const useAppStore = create<AppState>((set) => ({
  cart: 0,
  setCart: (val) => set({ cart: val }),
}));
