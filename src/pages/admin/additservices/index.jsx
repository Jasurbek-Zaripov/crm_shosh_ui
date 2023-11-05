import React from 'react';
import AdditServiesComponent from '../../../components/admin/addit_services';
import Sidebar from '../../../components/sidebar/index';
import { dataSidebarDirector } from '../../director/sidebar-data';
import { dataSidebarManager } from '../../manager/sidebar-data';
import { dataSidebar } from '../sidebar-data';

const AdditServies = () => {
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

  return (
    <>
      {items && (
        <Sidebar items={items}>
          <AdditServiesComponent />
        </Sidebar>
      )}
    </>
  );
};

export default AdditServies;
