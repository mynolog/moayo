export const ROUTES = {
  ROOT: '/',

  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  BOOK_DETAIL: (isbn: string = ':isbn') => `/books/${isbn}`,
} as const;
