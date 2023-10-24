import Sidebar from "../../../components/sidebar"
import {dataSidebar} from "../sidebar-data"
import styles from "./style.module.css"
import React from "react";
import Applications from "../../../components/admin/applications";
import {dataSidebarManager} from "../../manager/sidebar-data";
import {dataSidebarDirector} from "../../director/sidebar-data";

function Application() {
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    
    return (
        <div className={styles.wrapper}>
            {data?.role === 'Admin' ? <Sidebar items={dataSidebar}>
                <Applications/>
            </Sidebar> : data?.role === 'manager' ? <Sidebar items={dataSidebarManager}>
                <Applications/>
            </Sidebar> : data?.role === 'director' ? <Sidebar items={dataSidebarDirector}>
                <Applications/>
            </Sidebar> : null}
        </div>

    )
}

export default Application
