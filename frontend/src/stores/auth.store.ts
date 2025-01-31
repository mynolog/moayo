import { defineStore } from 'pinia';

interface User {
  accountId: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
    user: null,
  }),
  actions: {
    async signIn(user: User) {
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
