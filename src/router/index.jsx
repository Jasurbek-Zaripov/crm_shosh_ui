import {Route, Routes} from "react-router-dom"
import Login from "../pages/login"
import Admin from "../panels/admin/index"
import Manager from "../panels/manager"
import Director from "../panels/director"

function RouterComponent() {
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return (
        <>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
            </Routes>
            {data?.role === 'Admin' ? <Admin/> : null}
            {data?.role === 'director' ? <Director/> : null}
            {data?.role === 'manager' ? <Manager/> : null}
            {!data?.role ? <Login/> : null}
        </>
    )
}

export default RouterComponent