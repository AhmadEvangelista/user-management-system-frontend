// store/useStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

interface State {
  data: unknown;
  isLoading: boolean;
  error: string | null | unknown;
  fetchData: () => Promise<void>;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/endpoint");
      set({ data: response.data, isLoading: false });
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useStore;
