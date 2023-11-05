import { dataSidebar } from '../pages/admin/sidebar-data';
import { dataSidebarDirector } from '../pages/director/sidebar-data';
import { dataSidebarManager } from '../pages/manager/sidebar-data';
import Sidebar from './sidebar/index';

export default function AdditServies({ children }) {
  const data = JSON.parse(window.localStorage.getItem('AuthDataUser'));
  let items = null;
  switch (data?.role) {
    case 'Admin':
      items = dataSidebar;
      break;
    case 'manager':
      items = dataSidebarManager;
      break;
    case 'director':
      items = dataSidebarDirector;
      break;
    default:
  }

  return <>{items && <Sidebar items={items}>{children}</Sidebar>}</>;
}
