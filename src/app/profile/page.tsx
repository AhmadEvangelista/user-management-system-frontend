"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/profile/profile.store";
import Label from "@/components/Label";
import decodeJWTManual from "@/utils/decodeJWT";

export default function Profile() {
  const router = useRouter();
  const data = useProfileStore((state) => state.data);
  const error = useProfileStore((state) => state.error);
  // const resetError = useProfileStore((state) => state.resetError);
  const profileInfo = useProfileStore((state) => state.profileInfo);
  const accessToken = localStorage.getItem("accessToken");
  const decodedAccessToken = decodeJWTManual(String(accessToken));
  const userId = decodedAccessToken?.payload.id;

  useEffect(() => {
    if (!accessToken) {
      return router.push("/login");
    }
    profileInfo(String(userId));
  }, [accessToken, profileInfo, router, userId]);

  if (!accessToken) {
    return <p>Redirecting...</p>;
  }

  if (error) {
    return console.log("Error", error);
  }

  return (
    <div className="bg-white mx-auto my-72 w-96 p-6 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Profile
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div className="text-center">
            <Label
              htmlFor="password"
              className="text-sm/6 font-medium text-gray-900"
              text="Email: "
            />
            <Label
              htmlFor="password"
              className="text-sm/6 font-medium text-gray-900"
              text={String(data?.email)}
            />
          </div>
          <div className="text-center">
            <Label
              htmlFor="password"
              className="text-sm/6 font-medium text-gray-900"
              text="Username: "
            />
            <Label
              htmlFor="password"
              className="text-sm/6 font-medium text-gray-900"
              text={String(data?.username)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className=" w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
              onClick={() => router.push("/change-password")}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
