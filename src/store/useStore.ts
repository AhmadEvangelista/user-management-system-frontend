// store/useStore.js
import { create } from "zustand";
import { publicApiInstance } from "@/utils/axiosInstance";
import { RegisterType } from "@/types/types";

interface State {
  data: unknown;
  isLoading: boolean;
  error: string | null | unknown;
  registerData: (registerDataPayload: RegisterType) => Promise<void>;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  registerData: async (registerDataPayload: RegisterType) => {
    console.log("ENDPOINT register");

    set({ isLoading: true, error: null });
    try {
      const response = await publicApiInstance.post(
        "/auth/register",
        registerDataPayload
      );
      console.log("ENDPOINT register data", response);

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
