import {useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "../../../../common/button";
import AddNewEmployees from "./add_new_employees";
import styles from "./styles.module.css";

function Top() {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false)
    const HandleOpen = () => setOpen(true)
    const HandleClose = () => setOpen(false)
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return (
        <>
            <div className={styles.wrapper}>
                <h3>{t("employees.0")}</h3>
                {dataUser.role === 'manager' ?
                    <Button style={{padding: "0 25px"}} onClick={HandleOpen}>{t("employees.1")}</Button> : null}

            </div>
            <AddNewEmployees open={open} onCancel={HandleClose}/>
        </>
    );
}

export default Top;
