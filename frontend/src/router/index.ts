import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from './apiRoutes';

import MainPage from '@/pages/home/MainPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.ROOT,
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: ROUTES.SIGN_UP,
    name: 'SignUpPage',
    component: () => import('@/pages/users/SignUpPage.vue'),
  },
  {
    path: ROUTES.SIGN_IN,
    name: 'SignInPage',
    component: () => import('@/pages/users/SignInPage.vue'),
  },
  {
    path: '/books',
    children: [
      {
        path: ROUTES.BOOK_DETAIL(),
        name: 'BookDetail',
        component: () => import('@/pages/books/BookDetail.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
