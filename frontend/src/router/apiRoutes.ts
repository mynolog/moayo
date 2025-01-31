export const ROUTES = {
  ROOT: '/',

  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  DASHBOARD: '/dashboard',

  BOOKS: '/books',
  BOOK_SEARCH: '/books/search',
  BOOK_DETAIL: (isbn13: string = ':isbn13') => `/books/${isbn13}`,
} as const;
