import { create } from "zustand";
import { publicApiInstance } from "@/utils/axiosInstance";
import { LoginType, LoginResponseType } from "@/store/login/login.type";

interface State {
  data: { accessToken: string } | null;
  isLoading: boolean;
  error: string | null | unknown;
  accessToken: string | null | unknown;

  login: (loginDataPayload: LoginType) => Promise<void>;
  resetError: () => void;
  resetData: () => void;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,

  login: async (loginDataPayload: LoginType) => {
    set({ isLoading: true, error: null });
    try {
      const response: LoginResponseType = await publicApiInstance.post(
        "/auth/login",
        loginDataPayload
      );

      if (response.statusCode === 400) {
        set({ error: response.message, isLoading: false });
      } else {
        set({ accessToken: response.data.accessToken, isLoading: false });
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
  resetError: () => {
    set({ error: null });
  },
  resetData: () => {
    set({ accessToken: null });
  },
}));

export default useStore;
