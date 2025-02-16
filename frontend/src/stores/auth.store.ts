import { defineStore } from 'pinia';

interface AuthUser {
  accountId: string;
  _id: string;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

interface AuthState {
  isAuth: boolean;
  user: AuthUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
    user: null,
  }),
  actions: {
    async signIn(user: AuthUser) {
      try {
        this.isAuth = true;
        this.user = user;
        return true;
      } catch (error) {
        console.error('로그인 실패', error);
        return false;
      }
    },
    async signOut() {
      try {
        this.isAuth = false;
        this.user = null;
        return true;
      } catch (error) {
        console.error('로그아웃 실패', error);
        return false;
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuth,
    getUser: (state) => state.user,
  },
  persist: {
    storage: localStorage,
  },
});
