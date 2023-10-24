import ChessComponent from "../../../components/admin/chess"
import Sidebar from "../../../components/sidebar"
import { dataSidebarDirector } from "../../director/sidebar-data"
import { dataSidebarManager } from "../../manager/sidebar-data"
import { dataSidebar } from "../sidebar-data"

function Chess() {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    
    return(
        <>
              {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
                <ChessComponent />
              </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
                <ChessComponent />
              </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
                <ChessComponent />
              </Sidebar> : null}

        </>
    )
}
export default Chess