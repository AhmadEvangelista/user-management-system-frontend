import { create } from "zustand";
import { publicApiInstance } from "@/utils/axiosInstance";
import { RegisterType } from "@/store/register/register.type";

interface State {
  data:
    | { accessToken: string }
    | unknown
    | {
        username: string;
        id: number;
        email: string;
        password: string;
      };
  isLoading: boolean;
  error: string | null | unknown;
  accessToken: string | null | unknown;

  register: (registerDataPayload: RegisterType) => Promise<void>;
  resetRegisterData: () => void;
  resetError: () => void;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,

  register: async (registerDataPayload: RegisterType) => {
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
  resetRegisterData: () => {
    set({ data: null });
  },
  resetError: () => {
    set({ error: null });
  },
}));

export default useStore;
