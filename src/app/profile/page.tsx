"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/profile/profile.store";
import decodeJWTManual from "@/utils/decodeJWT";
import isTokenExpired from "@/utils/isTokenEpred";
import getToken from "@/utils/getToken";

export default function Profile() {
  const router = useRouter();
  const profileInfo = useProfileStore((state) => state.profileInfo);
  const isLoading = useProfileStore((state) => state.isLoading);
  const error = useProfileStore((state) => state.error);
  const resetError = useProfileStore((state) => state.resetError);
  const data = useProfileStore((state) => state.data);
  const accessToken = getToken();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSave, setIsSave] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (accessToken) {
      const decodedAccessToken = decodeJWTManual(String(accessToken));
      const userId = decodedAccessToken?.payload.id;
      if (userId) {
        profileInfo(String(userId));
      }
    }
    if (!accessToken || isTokenExpired(String(accessToken))) {
      router.replace("/login");
      return;
    }
  }, [accessToken, profileInfo, router]);

  useEffect(() => {
    if (data) {
      setUsername(String(data?.username));
      setEmail(String(data?.email));
    }
  }, [data]);

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  if (isLoading) {
    return (
      <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">Loading</div>
    );
  }

  if (error) {
    return (
      <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
        <div className="flex justify-center pb-4">
          <strong className="flex text-black">Error: {String(error)}</strong>
        </div>
        <button
          onClick={resetError}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-center text-xl font-bold mb-4 text-gray-900">
          Profile
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-24 font-medium text-gray-900">Username:</label>
            <input
              required={true}
              disabled={isDisabled}
              value={username}
              onChange={onChangeUsername}
              className="flex-1 px-2 py-1 border rounded bg-gray-100 text-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed "
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-medium text-gray-900">Email:</label>
            <input
              required={true}
              disabled={isDisabled}
              value={email}
              onChange={onChangeEmail}
              className="flex-1 px-2 py-1 border rounded bg-gray-100 text-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed "
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => router.push("/change-password")}>
              Change Password
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                if (isSave) {
                  console.log("SAVE BUTTON CLICKED");
                  setIsDisabled(true);
                  setIsSave(false);
                  // check fields if the same with data
                  // else save the refetch new data

                  let payload: { username: string; email: string } | {} = {};
                  if (username !== data?.username) {
                    payload.username = username;
                  }
                  if (email !== data?.email) {
                    payload.email = email;
                  }
                  console.log("payload", payload);
                } else {
                  console.log("EDIT BUTTON CLICKED");
                  setIsDisabled(false);
                  setIsSave(true);
                }
              }}>
              {isSave ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
