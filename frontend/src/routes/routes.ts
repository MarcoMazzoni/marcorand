import Home from '../views/Home';
import BlockExplorer from '../views/BlockExplorer';
//import Login from '../views/Login';

export const routes: MyRoute[] = [
  {
    path: '/home',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Home,
    layout: '/page'
  },
  {
    path: '/explorer',
    name: 'BlockExplorer',
    icon: 'ni ni-bullet-list-67 text-red',
    component: BlockExplorer,
    layout: '/page'
  }
  // {
  //   path: '/login',
  //   name: 'Login',
  //   icon: 'ni ni-key-25 text-info',
  //   component: Login,
  //   layout: '/page'
  // }
];

export interface MyRoute {
  path: string;
  name: string;
  icon: string;
  component: any;
  layout: string;
}
