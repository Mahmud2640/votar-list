const KEY = "admin_logged_in";

export const isLoggedIn = () => localStorage.getItem(KEY) === "true";
export const setLoggedIn = () => localStorage.setItem(KEY, "true");
export const logout = () => localStorage.removeItem(KEY);
