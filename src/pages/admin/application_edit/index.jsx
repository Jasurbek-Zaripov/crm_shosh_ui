import ApplicationEditComponent from "../../../components/admin/application_number_edit"
import Sidebar from "../../../components/sidebar"
import { dataSidebarDirector } from "../../director/sidebar-data"
import { dataSidebarManager } from "../../manager/sidebar-data"
import { dataSidebar } from "../sidebar-data"


function ApplicationEdit() {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return(

        <>
                        {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
                <ApplicationEditComponent />
              </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
                <ApplicationEditComponent />
              </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
                <ApplicationEditComponent />
              </Sidebar> : null}
        </>
    )
}
export default ApplicationEdit