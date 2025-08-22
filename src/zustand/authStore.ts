// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// interface IUser {
//   fullName: string;
//   email: string;
// };

// interface IAuthState {
//   user: IUser | null;
//   isAuthenticated: boolean;
//   login: (user: IUser | any) => void;
//   logout: () => void;
//   error: Error | null;
//   isError: boolean;
//   setError: (error: Error | null) => void;
// }

// const useAuthStore = create<IAuthState>()(
//   persist(
//     set => ({
//       user: null,
//       isAuthenticated: false,
//       login: (user) => set({
//         user: {
//           fullName: user.fullName,
//           email: user.email,
//         },
//         isAuthenticated: true,
//       }),
//       logout: () => set({
//         user: null,
//         isAuthenticated: false,
//       }),
//       isError: false,
//       error: null,
//       setError: (error) => set({
//         isError: true,
//         error
//       }),
//     }),
//     {
//       name: "auth-storage", // localStorage key
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useAuthStore;

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