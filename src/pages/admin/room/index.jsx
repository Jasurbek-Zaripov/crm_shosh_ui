import React from 'react'
import Sidebar from "../../../components/sidebar";
import { dataSidebar } from "../sidebar-data";
import RoomComponent from '../../../components/admin/room';
import { dataSidebarManager } from '../../manager/sidebar-data';
import { dataSidebarDirector } from '../../director/sidebar-data';

const Room = () => {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

  return (

    <>
              {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
          <RoomComponent />
        </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
          <RoomComponent />
        </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
          <RoomComponent />
        </Sidebar> : null}
    </>
  )
}

export default Room