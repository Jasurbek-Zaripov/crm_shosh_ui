import { lazy } from 'react';
import ApplicationEdit from '../../pages/admin/application_edit';
import Employees from '../../pages/admin/employees';

const Application = lazy(() => import('./../../pages/admin/applications/index'));
const ApplicationAdd = lazy(() => import('./../../pages/admin/application_add/index'));
const FinanceComponent = lazy(() => import('./../../pages/admin/finance/index'));
const Setting = lazy(() => import('../../pages/admin/setting/index'));
const Chess = lazy(() => import('../../pages/admin/chess/index'));
const AdditServies = lazy(() => import('../../pages/admin/additservices/index'));
const Room = lazy(() => import('../../pages/admin/room/index'));
const UpdateOrder = lazy(() => import('../../pages/admin/update_order/index'));

export const data = [
  {
    path: '/application',
    Element: <Application />,
  },
  {
    path: '/applicationadd',
    Element: <ApplicationAdd />,
  },
  {
    path: '/applicationadd/:id',
    Element: <ApplicationAdd />,
  },

  {
    path: '/applicationedit/:id',
    Element: <ApplicationEdit />,
  },
  {
    path: '/finance',
    Element: <FinanceComponent />,
  },
  {
    path: '/setting',
    Element: <Setting />,
  },
  {
    path: '/employees',
    Element: <Employees />,
  },
  {
    path: '/chess',
    Element: <Chess />,
  },
  {
    path: '/additservies',
    Element: <AdditServies />,
  },
  {
    path: '/room/:id',
    Element: <Room />,
  },
  {
    path: '/update/order/:id',
    Element: <UpdateOrder />,
  },
  {
    path: '',
    Element: <Application />,
  },
].map((item, i) => {
  item.id = i + 1;
  return item;
});
