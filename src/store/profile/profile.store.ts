import { create } from "zustand";
import { protectedApiInstance } from "@/utils/axiosInstance";
import { ErrorResponseType, SuccessResponseType } from "./profile.type";

// State Interface
interface State {
  data: {
    username: string;
    id: number;
    email: string;
    password: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;

  resetError: () => void;
  setIsLoading: () => void;
  profileInfo: (id: string) => Promise<void>;
  updateProfileInfo: (payload: {
    username?: string;
    email?: string;
  }) => Promise<void>;
}

// Zustand Store
const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,

  resetError: () => {
    set({ error: null });
  },
  setIsLoading: () => {
    set({ isLoading: true });
  },
  profileInfo: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      // Make the API request
      const response = await protectedApiInstance.get(`/users/${id}`);

      // Type narrowing for the response
      const data: SuccessResponseType = response.data;
      const errorData: ErrorResponseType | any = response;

      // Handle the response based on its type
      if (errorData?.statusCode === String(401) && data) {
        console.log("PROFLE STORE error", data);
        // Handle error response
        set({ data: null, error: errorData.message, isLoading: false });
      } else {
        set({ data: null, error: null, isLoading: false });
      }
      if (response.status === 200) {
        console.log("PROFLE STORE success", data);
        // Handle success response
        return set({ data: data, isLoading: false });
      }
    } catch (error) {
      // Error handling with a type guard
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
  updateProfileInfo: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      // Make the API request
      const response = await protectedApiInstance.post(
        `/update-username/${id}`
      );

      // Type narrowing for the response
      const data: SuccessResponseType = response.data;
      const errorData: ErrorResponseType | any = response;

      // Handle the response based on its type
      if (errorData?.statusCode === String(401) && data) {
        console.log("PROFLE STORE error", data);
        // Handle error response
        set({ data: null, error: errorData.message, isLoading: false });
      } else {
        set({ data: null, error: null, isLoading: false });
      }
      if (response.status === 200) {
        console.log("PROFLE STORE success", data);
        // Handle success response
        return set({ data: data, isLoading: false });
      }
    } catch (error) {
      // Error handling with a type guard
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useStore;
