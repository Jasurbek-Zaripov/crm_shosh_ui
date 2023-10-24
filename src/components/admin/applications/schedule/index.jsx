import {useTranslation} from "react-i18next"
import {useSelector} from "react-redux";
import SelectCommon from "../../../../common/select";
import styles from "./style.module.css"

function Schedule() {
    const {t} = useTranslation();

    function LanguageValue() {
        return window.localStorage.getItem("i18nextLng")
    }

    const arr = [1, 2, 3, 4]
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
    const Lids = useSelector(state => state.Lids.LidsGet.data)
    const LidsActive = useSelector(state => state.Lids.LidsActiveGet.data)
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    return (
        <div className={styles.box}>
            <div className={styles.top}>
                <h4>{t("appilcation.0")}</h4>
                <SelectCommon options={option_data} defaultValue={t("appilcation.1")}/>
            </div>

            <div className={styles.center}>
                <div className={styles.center_content}>
                    <p>{t("appilcation.2")}</p>
                    <h5>{Lids.map(elem => elem.filial?.filial_name === dataUser.filial.filial_name ? Lids.length : 0)[0]}</h5>
                </div>


                <div className={styles.center_content}>
                    <p>{t("appilcation.3")}</p>
                    <h5>{Lids.map(elem => elem.filial?.filial_name === dataUser.filial.filial_name ? LidsActive.length : 0)[0]}</h5>
                </div>
            </div>
            <p className={styles.title_table}>{t("appilcation.4")}</p>
            <div className={styles.tables}>
                {arr.map((index) =>
                    <div key={index} className={styles.table}>
                        <div className={styles.table_right}>
                            <h3>1</h3>
                            <div className={styles.table_right_left}>
                                <p>Шухрат</p>
                                <span>+998 (90) 999 99 99</span>
                            </div>
                        </div>
                        <h3>2</h3>

                    </div>
                )}
            </div>


        </div>
    )
}

export default Schedule