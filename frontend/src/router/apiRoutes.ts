export const ROUTES = {
  ROOT: '/',

  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  DASHBOARD: '/dashboard',

  BOOK_DETAIL: (isbn: string = ':isbn') => `/books/${isbn}`,
} as const;
