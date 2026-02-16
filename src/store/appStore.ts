import { create } from "zustand";

type AppState = {
  cart: number;
  setCart: (val: number) => void;
};

type NotifState = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;

  show: (data: {
    title: string;
    message: string;
    onConfirm?: () => void;
  }) => void;

  close: () => void;
};

export const useNotifStore = create<NotifState>((set) => ({
  open: false,
  title: "",
  message: "",
  onConfirm: () => {},
  onCancel: () => set({ open: false }),

  show: ({ title, message, onConfirm }) =>
    set({
      open: true,
      title,
      message,
      onConfirm: () => {
        onConfirm?.();
        set({ open: false });
      },
      onCancel: () => set({ open: false }),
    }),

  close: () => set({ open: false }),
}));

export const useAppStore = create<AppState>((set) => ({
  cart: 0,
  setCart: (val) => set({ cart: val }),
}));
