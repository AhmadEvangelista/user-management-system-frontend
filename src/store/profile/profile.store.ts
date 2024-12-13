import { create } from "zustand";
import { protectedApiInstance } from "@/utils/axiosInstance";

interface State {
  data: {
    username: string;
    id: number;
    email: string;
    password: string;
  } | null;
  isLoading: boolean;
  error: string | null | unknown;
  accessToken: string | null | unknown;

  resetError: () => void;
  profileInfo: (profileInfoPayload: string) => Promise<void>;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,

  resetError: () => {
    set({ error: null });
  },
  profileInfo: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await protectedApiInstance.get<{
        username: string;
        id: number;
        email: string;
        password: string;
      }>(`/users/${id}`);

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
