import { faHome, faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const mainNavList = [
  {
    id: '1000',
    name: '홈',
    icon: faHome,
    path: '/',
  },
];

export const userNavList = [
  {
    id: '1001',
    name: '마이페이지',
    icon: faUserCircle,
    path: `/dashboard`,
  },
  {
    id: '1002',
    name: '로그아웃',
    icon: faArrowRightFromBracket,
    action: 'signOut',
  },
];
