import React from 'react'
import SmenaComponent from '../../../components/manager/smena'
import Sidebar from '../../../components/sidebar'
import { dataSidebarManager } from '../sidebar-data'

const Smena = () => {
  return (
    <Sidebar items={dataSidebarManager}>
    <SmenaComponent />
  </Sidebar>
  )
}

export default Smena