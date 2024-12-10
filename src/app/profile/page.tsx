"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // If the user is not authenticated, redirect to login page
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return <p>Redirecting...</p>; // Optionally show a loading state or message
  }

  return <div>Profie</div>;
};

export default Profile;
