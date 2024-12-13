const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return token;
    }
  }
};
export default getToken;
