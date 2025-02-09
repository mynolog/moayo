export const ROUTES = {
  // Root
  ROOT: '/',
  API: '/api',
  // /auth
  AUTH: '/auth',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  CHECK: '/check',
  // /users
  USERS: '/users',
  MY_REVIEWS: '/reviews',
  MY_PROFILE: '/me',
  // /books
  BOOKS: '/books',
  SEARCH: '/search',
  BOOK_DETAIL: '/:isbn13',
  REVIEWS: '/:isbn13/reviews',
} as const;
