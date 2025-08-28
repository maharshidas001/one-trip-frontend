import { create } from "zustand";

interface IUser {
  fullName: string;
  email: string;
}

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) =>
    set({
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;