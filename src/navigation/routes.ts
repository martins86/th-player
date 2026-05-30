export const appRoutes = {
  HOME: '/',
  LOGIN: '/login',
  PLAYER: '/player/:id',
  SETTINGS: '/settings',
};

export const routePaths = {
  home: appRoutes.HOME,
  login: appRoutes.LOGIN,
  player: (id: string) => `/player/${id}`,
  settings: appRoutes.SETTINGS,
};
