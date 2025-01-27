export const ROUTES = {
  ROOT: '/',
  API: '/api',

  USERS: '/users',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',

  BOOKS: '/books',
  SEARCH: '/search',
  REVIEWS: '/:isbn13/reviews',
} as const;
