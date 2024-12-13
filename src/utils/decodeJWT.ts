import { DecodedJWT } from "@/types/types";

const decodeBase64Url = (base64Url: string): string => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
};

const decodeJWTManual = (token: string): DecodedJWT | undefined => {
  try {
    const [header, payload] = token.split(".");
    const decodedHeader = JSON.parse(decodeBase64Url(header));
    const decodedPayload = JSON.parse(decodeBase64Url(payload));
    return { header: decodedHeader, payload: decodedPayload };
  } catch (error) {
    console.error("Invalid token:", error);
  }
};

export default decodeJWTManual;
