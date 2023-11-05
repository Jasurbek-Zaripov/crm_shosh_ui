import ChessComponent from "../../../components/admin/chess"
import Sidebar from "../../../components/sidebar"
import {dataSidebarDirector} from "../../director/sidebar-data"
import {dataSidebarManager} from "../../manager/sidebar-data"
import {dataSidebar} from "../sidebar-data"

function Chess() {
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    let items = null
    switch (data?.role) {
        case 'Admin':
            items = dataSidebar
            break
        case 'manager':
            items = dataSidebarManager
            break
        case 'director':
            items = dataSidebarDirector
            break
        default:
    }

    return (
        <>
            {items &&
                <Sidebar items={items}>
                    <ChessComponent/>
                </Sidebar>}

        </>
    )
}

export default Chess