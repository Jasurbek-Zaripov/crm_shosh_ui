import { lazy } from "react";
import ApplicationEditComponent from "../../components/admin/application_number_edit";
import ApplicationEdit from "../../pages/admin/application_edit";
import Employees from "../../pages/admin/employees";
import FilalAdd from "../../pages/director/filals_add";
import AdminSmena from "../../pages/manager/admin-smena";
import Smena from "../../pages/manager/smena";
const Application = lazy(() => import("./../../pages/admin/applications/index"))
const ApplicationAdd = lazy(() => import("./../../pages/admin/application_add/index"))
const FinanceComponent = lazy(() => import("./../../pages/admin/finance/index"))
const Setting = lazy(() => import('../../pages/admin/setting/index'))
const Chess = lazy(() => import("../../pages/admin/chess/index"))
const AdditServies = lazy(() => import("../../pages/admin/additservices/index"))
const Room = lazy(() => import('../../pages/admin/room/index'))

export const data = [
    {
        id : 1, 
        path : "/director/application",
        Element : <Application/>
    },
    {
        id : 2, 
        path : "/director/applicationadd",
        Element : <ApplicationAdd/>
    },
    {
        id : 2, 
        path : "/director/applicationadd/:id",
        Element : <ApplicationAdd/>
    },
    {
        id : 3, 
        path : "/director/finance",
        Element : <FinanceComponent/>
    },
    {
        id : 2, 
        path : "/director/applicationedit/:id",
        Element : <ApplicationEdit/>
    },
    {
        id : 4, 
        path : "/director/setting",
        Element : <Setting/>
    },
    {
        id : 2, 
        path : "/director/employees",
        Element : <Employees/>
    },
    {
        id: 3,
        path:"/director/chess",
        Element : <Chess/>
    },
    {
        id : 5, 
        path : "/director/additservies",
        Element : <AdditServies/>
    },
    {
        id : 6, 
        path : "/director/room/:id",
        Element : <Room/>
    },
    {
        id : 7,
        path : "/director/smena-admin",
        Element : <AdminSmena/>
    },
    {
        id : 7,
        path : "/director/smena-admin/:id",
        Element : <Smena/>
    },
    {
        id : 8,
        path : "/director/filal-add",
        Element : <FilalAdd/>
    }
]