// store/useStore.js
import { create } from "zustand";
import { publicApiInstance } from "@/utils/axiosInstance";
import { RegisterType, LoginType, LoginResponseType } from "@/types/types";
interface State {
  data: { accessToken: string } | unknown;
  isLoading: boolean;
  error: string | null | unknown;
  accessToken: string | null | unknown;

  registerData: (registerDataPayload: RegisterType) => Promise<void>;
  loginData: (loginDataPayload: LoginType) => Promise<void>;
  resetRegisterData: () => void;
  resetError: () => void;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,

  registerData: async (registerDataPayload: RegisterType) => {
    set({ isLoading: true, error: null });
    try {
      const response = await publicApiInstance.post(
        "/auth/register",
        registerDataPayload
      );

      set({ data: response.data, isLoading: false });
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },

  loginData: async (loginDataPayload: LoginType) => {
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
  resetRegisterData: () => {
    set({ data: null });
  },
  resetError: () => {
    set({ error: null });
  },
}));

export default useStore;
