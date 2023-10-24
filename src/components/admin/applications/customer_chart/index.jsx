import React from 'react'
import {useTranslation} from 'react-i18next';
import SelectCommon from '../../../../common/select'
import Charts from './charts';
import styles from "./style.module.css"

function CustomerCharts() {
    const {t} = useTranslation();

    function LanguageValue() {
        return window.localStorage.getItem("i18nextLng")
    }

    const option_data = [
        {
            id: 1,
            label: LanguageValue() === "ru" ? "Месяц" : LanguageValue() === "uz" ? "Oy" : LanguageValue() === "en" ? "Month" : null,
            value: "Месяц",
        },
        {
            id: 2,
            label: LanguageValue() === "ru" ? "Неделя" : LanguageValue() === "uz" ? "Hafta" : LanguageValue() === "en" ? "Week" : null,
            value: "неделя",
        },
    ]
    return (
        <div className={styles.box}>
            <div className={styles.top}>
                <h4>{t("appilcation.8")}</h4>
                <SelectCommon options={option_data} defaultValue={t("appilcation.1")}/>
            </div>
            <Charts/>
        </div>
    )
}

export default CustomerCharts