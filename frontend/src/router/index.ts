import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from './apiRoutes';

import MainPage from '@/pages/home/MainPage.vue';
import SignUpPage from '@/pages/auth/signUp/SignUpPage.vue';
import SignInPage from '@/pages/auth/signIn/SignInPage.vue';
import BookDetail from '@/pages/books/BookDetail.vue';
import UserDashboard from '@/pages/user/UserDashboard.vue';

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.ROOT,
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: ROUTES.SIGN_UP,
    name: 'SignUpPage',
    component: SignUpPage,
  },
  {
    path: ROUTES.SIGN_IN,
    name: 'SignInPage',
    component: SignInPage,
  },
  {
    path: ROUTES.DASHBOARD,
    name: 'UserDashboard',
    component: UserDashboard,
  },
  {
    path: '/books',
    children: [
      {
        path: ROUTES.BOOK_DETAIL(),
        name: 'BookDetail',
        component: BookDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 루트 페이지 네비게이션 가드
router.beforeEach((to, _, next) => {
  const authState = useAuthStore();
  const isAuth = authState.isLoggedIn;

  if (to.path === '/' && !isAuth) {
    next({ name: 'SignInPage' });
  } else {
    next();
  }
});

export default router;
