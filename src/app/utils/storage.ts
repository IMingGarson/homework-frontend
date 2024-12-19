const JWT_TOKEN = "JWT_TOKEN";

export const setToken = (key: string, token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, token);
  }
};

export const removeToken = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const getRole = (): string | null => {
  if (typeof window !== 'undefined') { 
    const token = localStorage.getItem(JWT_TOKEN);
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  }
  return null;
};

export function clientLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(JWT_TOKEN);
  }
}