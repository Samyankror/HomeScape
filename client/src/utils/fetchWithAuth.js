import { signOutFailure, signOutSuccess } from "../redux/user/userSlice";
import { store } from "../redux/store";
export const fetchWithAuth = async (url, options = {}) => {
  try {
    let res = await fetch(url, {
      ...options,
    });

    if (res.status === 401 || res.status === 403) {
      const refreshRes = await fetch("/api/auth/refreshToken", {
        method: "Post",
      });

      if (refreshRes.ok) {
        res = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
        });
      } else {
        store.dispatch(signOutSuccess());
        return null;
      }
    }

    return res.json();
  } catch (error) {
    console.log("fetchWithAuth error:", err);
    return null;
  }
};
