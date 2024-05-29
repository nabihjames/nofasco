import { instance } from "@/instance/axios";
import { create } from "zustand";

type CartStore = {
  cart: number;
  fetchCartCount: () => void;
  //   add: () => void;
  //   remove: () => void;
  //   removeAll: () => void;
};

type UserStore = {
  user: any;
  setUser: (user: any) => void;
  fetchUser: () => void;
  auth: boolean;
};

const fetchCartCount = async () => {
  try {
    const res = await instance.get("/cart/count");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch cart count:", error);
  }
};

const fetchUser = async (set: any) => {
  try {
    const res = await instance.get("/user/verify");
    set({ user: res.data.user, auth: true });
    return res.data.user;
  } catch (error) {
    console.error("Failed to fetch cart count:", error);
    set({ user: null, auth: false });
  }
};

export const useCartStore = create<CartStore>((set) => ({
  cart: 0,
  fetchCartCount: async () => {
    const count = await fetchCartCount();
    set({ cart: count });
  },
  //   add: () => set((state) => ({ cart: state.cart + 1 })),
  //   remove: () => {
  //     set((state) => {
  //       const newCart = Math.max(0, state.cart - 1);
  //       return { cart: newCart };
  //     });
  //   },
  //   removeAll: () => set({ cart: 0 }),
}));

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  auth: false,
  fetchUser: async () => {
    try {
      const res = await instance.get("/user/verify");
      set({ user: res.data.user, auth: true });
      return res.data.user;
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      set({ user: null, auth: false });
    }
  },
  setUser: (user: any) => set({ user }),
}));
