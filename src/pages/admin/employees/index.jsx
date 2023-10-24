import EmployeesComponent from "../../../components/admin/employees"
import Sidebar from "../../../components/sidebar"
import { dataSidebarDirector } from "../../director/sidebar-data"
import { dataSidebarManager } from "../../manager/sidebar-data"
import { dataSidebar } from "../sidebar-data"


function Employees() {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return(
        <>
                          {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
                  <EmployeesComponent />
                </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
                  <EmployeesComponent />
                </Sidebar> :data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
                  <EmployeesComponent />
                </Sidebar>  : null}
        </>

    )
}
export default Employees