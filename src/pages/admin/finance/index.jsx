import React from "react";
import FinanceComponent from "../../../components/admin/finance";
import Sidebar from "../../../components/sidebar";
import { dataSidebarDirector } from "../../director/sidebar-data";
import { dataSidebarManager } from "../../manager/sidebar-data";
import { dataSidebar } from "../sidebar-data";

const Finance = () => {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

  return (
    <>

      {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
                  <FinanceComponent />
                </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
                  <FinanceComponent />
                </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
                  <FinanceComponent />
                </Sidebar> : null}
    </>
  );
};

export default Finance;
