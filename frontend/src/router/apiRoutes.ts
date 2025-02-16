export const ROUTES = {
  ROOT: '/',

  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  DASHBOARD: '/dashboard',

  MY_PROFILE: '/users/me',
  MY_REVIEWS: '/users/reviews',

  BOOKS: '/books',
  BOOK_SEARCH: '/books/search',
  BOOK_DETAIL: (isbn13: string = ':isbn13') => `/books/${isbn13}`,
  BOOK_REVIEW: (isbn13: string = ':isbn13') => `/books/${isbn13}/reviews`,
} as const;
