import { api } from "@/config/axios";

interface ILoginUser {
  email: string;
  password: string;
}

interface ICreateUserProp extends ILoginUser {
  fullName: string;
}

class AuthService {
  // Create User
  async createUser({ fullName, email, password }: ICreateUserProp) {
    try {
      const res = await api.post("/api/v1/user/create", { fullName, email, password });
      return res.data; // expected: user object
    } catch (err) {
      console.error("CreateUser Error:", err);
      return err;
    }
  }

  // Login User
  async loginUser({ email, password }: ILoginUser) {
    try {
      const res = await api.post("/api/v1/user/login", { email, password });
      return res.data; // expected: user object
    } catch (err) {
      console.error("LoginUser Error:", err);
      return err;
    }
  }

  // Logout
  async logout() {
    try {
      const res = await api.get("/api/v1/user/logout");
      return res.data; // expected: { success: true }
    } catch (err) {
      console.error("Logout Error:", err);
      return err;
    }
  }

  // Auth Status
  async getAuthStatus() {
    try {
      const res = await api.get("/api/v1/user/auth-status");
      return res.data; // expected: user or null
    } catch (err) {
      console.error("AuthStatus Error:", err);
      return err;
    }
  }
}

export const authService = new AuthService();





























// import { api } from "@/config/axios";

// interface ILoginUser {
//   email: string;
//   password: string;
// };
// interface ICreateUserProp extends ILoginUser {
//   fullName: string;
// };

// class AuthService {


//   async createUser({ fullName, email, password }: ICreateUserProp) {
//     const data = await api.post('/api/v1/user/create', { fullName, email, password });

//     if (data.data.name === 'AxiosError') {
//       return null;
//     }

//     return data.data;
//   };


//   async loginUser({ email, password }: ILoginUser) {
//     const data = await api.post('/api/v1/user/login', { email, password });
//     if (data.data.name === 'AxiosError') {
//       return null;
//     }
//     return data.data;
//   };


//   async logout() {
//     const data = await api.get('/api/v1/user/logout');

//     if (data.data.name === 'AxiosError') {
//       return null;
//     }
//     return data.data;
//   };


//   async getAuthStatus() {
//     const data = await api.get('/api/v1/user/auth-status');

//     if (data.data.name === 'AxiosError') {
//       return null;
//     }
//     return data.data;
//   };
// }

// export const authService = new AuthService();