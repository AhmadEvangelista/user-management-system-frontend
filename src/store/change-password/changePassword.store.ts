import { create } from "zustand";
import { protectedApiInstance } from "@/utils/axiosInstance";
import {
  ChangePasswordType,
  ErrorResponseType,
  SuccessResponseType,
} from "@/store/change-password/changePassword.type";

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
  response: string | null | unknown;

  changePassword: (
    id: string,
    changePasswordPayload: ChangePasswordType
  ) => Promise<void>;
  resetChangePasswordData: () => void;
  changePasswordError: () => void;
}

const useStore = create<State>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  accessToken: null,
  response: null,

  changePassword: async (id, changePasswordPayload: ChangePasswordType) => {
    set({ isLoading: true, error: null });
    try {
      console.log("STORE", id, changePasswordPayload);
      const response = await protectedApiInstance.patch(
        `/users/change-password/${id}`,
        changePasswordPayload
      );

      console.log("ERROR", response);
      set({ data: response.data, response: response, isLoading: false });
      // Type narrowing for the response
      const data: SuccessResponseType = response.data;
      const errorData: ErrorResponseType = response;

      // Handle the response based on its type
      if (errorData.statusCode === String(401) && data) {
        // Handle error response
        set({ data: null, error: errorData.message, isLoading: false });
      } else {
        set({ data: null, error: null, isLoading: false });
      }
      if (response.status === 200) {
        // Handle success response
        return set({ data: data, isLoading: false });
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An unknown error occurred";
      set({ error: errorMessage, isLoading: false });
    }
  },
  resetChangePasswordData: () => {
    set({ data: null });
  },
  changePasswordError: () => {
    set({ error: null });
  },
}));

export default useStore;
