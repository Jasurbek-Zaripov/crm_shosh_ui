import React from "react";
import styles from "./style.module.css";
import {useTranslation} from "react-i18next";
import CalendarTable from "./calendar-table";
import SmenaTable from "./smena-table";

import "./table.css";

const Revenues = () => {
    const {t} = useTranslation();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return (
        <>
            <div>
                <div className={styles.calendar}>
                    <h1 className={styles.tableTitle}>{t("Finance.2")}</h1>
                    <CalendarTable/>
                </div>
                {data.role === 'Admin' ? <div>
                    <h1 className={styles.tableTitle}>{t("Finance.3")}</h1>
                    <SmenaTable/>
                </div> : null}

            </div>
        </>
    );
};

export default Revenues;
