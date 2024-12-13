import jwt, { JwtPayload } from "jsonwebtoken";

const isTokenExpired = (token: string): boolean => {
  try {
    // Decode the JWT token without verifying its signature
    const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded || !decoded.exp) {
      return true; // Token is invalid or missing expiration
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the expiration time is in the past
  } catch (error) {
    console.log("isTokenExpired", error);
    return true; // Token is invalid or some error occurred
  }
};

export default isTokenExpired;
