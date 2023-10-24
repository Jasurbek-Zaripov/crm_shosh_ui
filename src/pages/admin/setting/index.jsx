import React from "react";
import Sidebar from "../../../components/sidebar/index";
import { dataSidebar } from "../sidebar-data";
import SettingComponents from "../../../components/admin/settings";
import { dataSidebarManager } from "../../manager/sidebar-data";
import { dataSidebarDirector } from "../../director/sidebar-data";

const Setting = () => {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

  return (
    <>

      {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
          <SettingComponents />
        </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
          <SettingComponents />
        </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
          <SettingComponents />
        </Sidebar>  : null}
    </>
  );
};

export default Setting;
