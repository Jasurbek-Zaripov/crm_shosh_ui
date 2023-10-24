import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { LidsGet } from "../../../redux/lids";
import { OrdersGet } from "../../../redux/orders";
import ApplictionForm from "./application_form";
import ApplictionTable from "./application_table";
import ClientForm from "./client_form";
import ClientFormId from "./client_form/client_form_id";
import styles from "./style.module.css"
function ApplicationEditComponent() {
    const {t} = useTranslation();
    const {id} = useParams();
    const dispatch = useDispatch();
        useEffect(() => {
                dispatch(OrdersGet());         
        }, [])
        useEffect(() => {
            dispatch(LidsGet())
        }, [])
    return(
        <div className={styles.wrapper}>
                <ApplictionForm id={id}/>
                <ApplictionTable id={id}/>
                {window.localStorage.getItem("LidsId") ? <ClientFormId id={id}/> : <ClientForm id={id}/>}
                {/* <ClientFormId id={id}/> */}
        </div>
    )
}
export default ApplicationEditComponent