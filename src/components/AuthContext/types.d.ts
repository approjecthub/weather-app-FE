type AuthContextValue = {
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  getAuthToken: () => string | null;
  resetToken: () => Promise<void>;
};
