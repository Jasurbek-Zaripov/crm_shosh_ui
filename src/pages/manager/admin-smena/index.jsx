import React from 'react'
import AdditServiesComponent from '../../../components/admin/addit_services'
import AdminManagerComponent from '../../../components/manager/admin-smena'
import Sidebar from '../../../components/sidebar'
import { dataSidebar } from '../../admin/sidebar-data'
import { dataSidebarDirector } from '../../director/sidebar-data'
import { dataSidebarManager } from '../sidebar-data'

const AdminSmena = () => {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

  return (

      data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
      <AdminManagerComponent />
    </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
    <AdminManagerComponent />
    </Sidebar> : data?.role === 'director'? <Sidebar  items={dataSidebarDirector}>
      <AdminManagerComponent />
    </Sidebar>  : null

  )
}

export default AdminSmena